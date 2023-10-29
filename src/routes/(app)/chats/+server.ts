import { json } from '@sveltejs/kit';
import { deleteChat, getUserID, updateChat } from '$lib/chatDB';
import { prisma } from '$lib/server/prisma-client';
interface IMessage {
    id: string;
    createdAt: string;
    content: string;
    role: 'system' | 'user' | 'assistant' | 'function';
}

export async function POST({ request, cookies }) {
    const userID = await getUserID(cookies);
    const { messages, model } = await request.json();
    //console.dir(messages)
    if (userID && messages) {
        const newChat = await prisma.chat.create({
            data: {
                user_id: userID,
                messages: {
                    createMany: {
                        data: messages.map((message, index) => {
                            return {
                                id: message.id,
                                openai_unique_id: message.id,
                                role: message.role,
                                createdAt: message.createdAt,
                                content: message.content,
                                parent: index > 0 ? messages[index - 1].id : null,
                            };
                        })
                    }
                },
                currentNode: messages[messages.length - 1].id,
                model: model,
            }
        });
        return json({ chatID: newChat.id }, { status: 200 });
    }
}

export async function PATCH({ request, cookies }) {
    const userId = await getUserID(cookies);
    const { messages, chatId, parentNode } = await request.json();
    //console.log('inside patch method: ')
    //console.dir(messages)
    if (userId && chatId && messages) {
        const updateChat = await prisma.chat.update({
            where: {
                id: chatId,
                user_id: userId
            },
            data: {
                messages: {
                    createMany: {
                        data: messages.map((message, index) => {
                            //console.log(messages)
                            //console.log(index)
                            return {
                                id: message.id,
                                openai_unique_id: message.id,
                                role: message.role,
                                createdAt: message.createdAt,
                                content: message.content,
                                parent: index === 0 ? parentNode 
                                    : messages[index-1].id,

                            };
                        })
                    }
                },
                currentNode: messages[messages.length - 1].id
            },
            select: {
                messages: true
            }
        });
        return json({ messages: updateChat.messages }, { status: 200 });
    }

    return json({status: 500})
}

export async function GET({ request, cookies }) {
    const userID = await getUserID(cookies);
    if (userID) {
        const chats = await prisma.chat.findMany({
            where: {
                user_id: userID
            },
            orderBy: {
                id: 'desc'
            }
        });
        return json({ chats: chats }, { status: 200 });
    }
}

export async function DELETE({ request, cookies }) {
    const userID = await getUserID(cookies);
    const chatID = await request.json();
    if (!chatID || !userID) {
        return json({ message: 'Invalid chatID' }, { status: 400 });
    }

    const chat = await prisma.chat.delete({
        where: {
            id: chatID,
            user_id: userID
        }
    });

    return json({ message: 'chat deleted successfully' }, { status: 200 });
}
