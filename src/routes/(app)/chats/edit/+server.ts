import { json } from '@sveltejs/kit';
import { deleteChat, getUserID} from '$lib/chatDB';
import {prisma} from '$lib/prisma-client'

export async function POST({ request }) {
	const { title, chatID, edit } = await request.json();
	if (edit === 'title') {
		const updateChatTitle = await prisma.chat.update({
			where: {
				id: chatID
			},
			data: {
				title: title
			}
		});
		return json({ message: 'title updated successfully' }, { status: 200 });
	}
}
