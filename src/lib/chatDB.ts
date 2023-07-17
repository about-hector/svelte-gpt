import {PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function fetchChat(id: string) {
    const chat = await prisma.chat.findUnique({
        where: {
            id: id,
        },
        select: {
            messages: true, 
        }
    })

    return chat; 
}
