import { fetchChat, getUserID } from '$lib/chatDB';
import type { PageServerLoad } from './$types';
import { data } from './data.js';

export const load = (async ({ params, cookies }) => {
	const currentUser = await getUserID(cookies);
	if (!currentUser) {
		return {
			auth: false,
			redirectTo: '/auth'
		};
	}
	//const chat = await fetchChat(params.chat_id, currentUser);
	if (!data) {
		return {
			auth: true,
			authorized: false,
			redirectTo: '/'
			//chatID: params.chat_id
		};
	}

	return {
		auth: true,
		authorized: true,
		chat: data.mapping,
		chatID: data.conversation_id,
		currentNode: data.current_node
	};
}) satisfies PageServerLoad;
