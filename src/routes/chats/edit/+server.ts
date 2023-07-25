import { json } from '@sveltejs/kit'
import { deleteChat, getUserID, prisma } from '$lib/chatDB'


export async function POST({ request }) {
    const { title, chatID, edit } = await request.json();
    console.log(edit)
    if (edit === 'title') {
        const updateChatTitle = await prisma.chat.update({
            where: {
                id: chatID,
            },
            data: {
                title: title,
            }
        })
        return json({ message: 'title updated successfully' }, { status: 200 })
    }
}
