import { json } from '@sveltejs/kit';
import { prisma } from './prisma-client';

export async function fetchChat(id: string, userId: string) {
	try {
		const chat = await prisma.chat.findUnique({
			where: {
				id: id,
				user_id: userId
			},
			select: {
				messages: true,
				model: true
			}
		});
		return chat;
	} catch (e) {
		console.log('Failed retrieving chat ' + id);
		console.log('Error: ' + e);
	}
}

export async function deleteChat(id: string) {
	const chat = await prisma.chat.delete({
		where: {
			id: id
		}
	});
	return chat;
}

const tokenName =
	process.env.NODE_ENV === 'development'
		? 'next-auth.session-token'
		: '__Secure-next-auth.session-token';

export async function getUserID(cookies) {
	const token = cookies.get(tokenName);
	if (!token) {
		return undefined;
	}
	const session = await prisma.session.findUnique({ where: { sessionToken: token } });
	return session?.userId;
}

export async function generateChatTitle(messages, chatID) {
	const completion = await fetch('/api/completion', {
		method: 'POST',
		body: JSON.stringify({ messages: messages, chatID: chatID })
	});

	const title = await completion.json();
	return {
		id: chatID,
		title: title
	};
}

export async function saveMessage(message, chatID, user) {
	const newMessage = await prisma.message.create({
		data: {
			openai_unique_id: message.id,
			role: message.role,
			createdAt: message.createdAt,
			content: message.content,
			parent: message.parent
		}
	});
}

export async function createChat(message, user) {
	try {
		const newChat = await prisma.chat.create({
			data: {
				user_id: user,
				messages: {
					create: {
						openai_unique_id: message.id,
						role: message.role,
						createdAt: message.createdAt,
						content: message.content,
						parent: message.parent
					}
				},
				currentNode: message.id
			}
		});
		return json({ chat: newChat }, { status: 200 });
	} catch (e) {
		console.log('Something went wrong: ' + e);
		throw new Error('Error: ' + e);
	}
}

export async function updateChat(message, user, chatID) {
	try {
		const newChat = await prisma.chat.update({
			where: {
				id: chatID,
				user_id: user
			},
			data: {
				messages: {
					create: {
						openai_unique_id: message.id,
						role: message.role,
						createdAt: message.createdAt,
						content: message.content,
						parent: message.parent
					}
				},
				currentNode: message.id
			},
			select: {
				messages: true
			}
		});

		return json({ chat: newChat }, { status: 200 });
	} catch (e) {
		console.log('Something went wrong: ' + e);
		throw new Error('Error: ' + e);
	}
}
