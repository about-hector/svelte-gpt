import {PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function fetchChat(id: string, userID: string) {
    const chat = await prisma.chat.findUnique({
        where: {
            id: id,
            user_id: userID

        },
        select: {
            messages: true, 
        }
    })

    return chat; 
}

const tokenName = process.env.NODE_ENV === 'development'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token'; 

export async function getUserID(cookies) {
    const token = cookies.get(tokenName);
    if (!token) {
        return 'not-signed-in'
    }
    const session = await prisma.session.findUnique({ where: { sessionToken: token } })
    return session?.userId;

}
