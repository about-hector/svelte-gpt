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


export async function deleteChat(id: string) {
    const chat = await prisma.chat.delete({
        where: {
            id: id,
        },
    })
    return chat;
}


const tokenName = process.env.NODE_ENV === 'development'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token'; 

export async function getUserID(cookies) {
    const token = cookies.get(tokenName);
    if (!token) {
        return undefined;
    }
    const session = await prisma.session.findUnique({ where: { sessionToken: token } })
    return session?.userId;

}

export async function generateChatTitle(messages, chatID) {
    const completion = await fetch('/api/completion', {
        method: 'POST',
        body: JSON.stringify({messages: messages, chatID: chatID})
    })
    


    const title = await completion.json()
    return {
        id: chatID, 
        title: title 
    }
}
