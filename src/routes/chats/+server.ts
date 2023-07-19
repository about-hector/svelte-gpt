import { json } from '@sveltejs/kit'
import { deleteChat, getUserID, prisma } from '$lib/chatDB'
interface IMessage {
    id: string,
    createdAt: string,
    content: string,
    role: 'user' | 'assistant' | 'function'
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
                        data: [{
                            openai_unique_id: messages[0].id,
                            role: messages[0].role,
                            createdAt: messages[0].createdAt,
                            content: messages[0].content
                        }, {
                            openai_unique_id: messages[1].id,
                            role: messages[1].role,
                            createdAt: messages[1].createdAt,
                            content: messages[1].content
                        }
                        ]
                    }
                },
            }
        })
        return json( {chatID: newChat.id} , { status: 200 })
    }
    //const cookies = cookie.parse(req.headers.cookie || '')
}

export async function GET({ request, cookies }) {
    const userID = await getUserID(cookies);
    if (userID) {
        const chats = await prisma.chat.findMany({
            where: {
                user_id: userID,
            }
        });
        console.log(chats)
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
