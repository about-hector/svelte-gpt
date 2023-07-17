import { json } from '@sveltejs/kit'
import { prisma } from '$lib/chatDB'
interface IMessage {
    id: string,
    createdAt: string,
    content: string,
    role: 'user' | 'assistant' | 'function'
}

const tokenName = process.env.NODE_ENV === 'development'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token'; 

async function getUserID(cookies: any) {
    const token = cookies.get(tokenName);
    const session = await prisma.session.findUnique({ where: { sessionToken: token } })
    return session?.userId;

}

export async function POST({ request, cookies }) {
    const userID = await getUserID(cookies);
    const messages: IMessage[] = await request.json();
    console.log('userID: ', userID)
    console.log('messages: ', messages)

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
