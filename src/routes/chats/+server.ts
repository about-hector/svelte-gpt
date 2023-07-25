import { json } from '@sveltejs/kit'
import { deleteChat, getUserID, prisma } from '$lib/chatDB'
interface IMessage {
    id: string,
    createdAt: string,
    content: string,
    role: 'system' | 'user' | 'assistant' | 'function'
}


export async function POST({ request, cookies }) {
    const userID = await getUserID(cookies);
    const messages: IMessage[] = await request.json();
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
            }
        })
    return json( {chatID: newChat.id} , { status: 200 })
    }
}

export async function PATCH({request, cookies}) {
    const userID = await getUserID(cookies);
    const {chat, id} = await request.json();
    console.log ('Messages: ' + chat, 'chatID: ' + id)
    if (userID && id && chat) {
        const updateChat = await prisma.chat.update({
            where: {
                id: id, 
                user_id: userID
            },
            data: {
                messages: {
                    createMany: {
                        data: chat.map((message) => {
                            return {
                                openai_unique_id: message.id,
                                role: message.role,
                                createdAt: message.createdAt,
                                content: message.content
                            }
                        })
                    }
                }
            },
            select: {
                messages: true
            }
        })
    }


    return json({message: 'chat record updated successfully'}, {status: 200})
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
        return json({message: 'Invalid chatID'},{status: 400})
    }
    
    const chat = await prisma.chat.delete({
        where: {
           id: chatID,
           user_id: userID
        }
    })

    return json({message: 'chat deleted successfully'}, {status: 200})

}





