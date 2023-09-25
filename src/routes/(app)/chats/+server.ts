import { json } from '@sveltejs/kit'
import { deleteChat, getUserID } from '$lib/chatDB'
import { prisma } from '$lib/prisma-client'
interface IMessage {
    id: string,
    createdAt: string,
    content: string,
    role: 'system' | 'user' | 'assistant' | 'function'
}


export async function POST({ request, cookies }) {
    const userID = await getUserID(cookies);
    const { messages, model } = await request.json();
    if (userID && messages) {
        const newChat = await prisma.chat.create({
            data: {
                user_id: userID,
                messages: {
                    createMany: {
                        data: messages.map((message) => {
                            return {
                                openai_unique_id: message.id,
                                role: message.role,
                                createdAt: message.createdAt,
                                content: message.content
                            }
                        })
                    }
                },
                currentNode: messages[messages.length - 1].id,
                model: model
            }
        })
        console.log('Saved to db. Here is the data returned:')
        console.table(newChat)
        return json({ chatID: newChat.id }, { status: 200 })
    }
}

export async function PATCH({ request, cookies }) {
    const userId = await getUserID(cookies);
    const { messages, chatId } = await request.json();
    if (userId && chatId && messages) {
        const updateChat = await prisma.chat.update({
            where: {
                id: chatId,
                user_id: userId
            },
            data: {
                messages: {
                    createMany: {
                        data: messages.map((message) => {
                            return {
                                openai_unique_id: message.id,
                                role: message.role,
                                createdAt: message.createdAt,
                                content: message.content
                            }
                        })
                    }
                },
                currentNode: messages[messages.length -1].id,
            },
            select: {
                messages: true
            }
        })
    }
    return json({ message: 'chat record updated successfully' }, { status: 200 })
}

export async function GET({ request, cookies }) {
    const userID = await getUserID(cookies);
    if (userID) {
        const chats = await prisma.chat.findMany({
            where: {
                user_id: userID,
            },
            orderBy: {
                id: "desc"
            }
        });
        return json({ chats: chats }, { status: 200 })
    }
}


export async function DELETE({ request, cookies }) {
    const userID = await getUserID(cookies);
    const chatID = await request.json();
    if (!chatID || !userID) {
        return json({ message: 'Invalid chatID' }, { status: 400 })
    }

    const chat = await prisma.chat.delete({
        where: {
            id: chatID,
            user_id: userID
        }
    })

    return json({ message: 'chat deleted successfully' }, { status: 200 })

}





