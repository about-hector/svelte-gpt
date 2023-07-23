import { fetchChat, getUserID } from '$lib/chatDB';
import type { PageServerLoad } from '../../$types';

export const load = (async ({ params, cookies }) => {
    const currentUser = await getUserID(cookies)
    if (!currentUser) {
        return {
            auth: false,
            redirectTo: '/auth'
        };
    }
    const chat = await fetchChat(params.chat_id, currentUser);
    if (!chat) {
    return {
            auth: true,
            authorized: false,
            redirectTo: '/',
            chatID: params.chat_id
        }
    }
    return {
        auth: true, 
        authorized: true, 
        chat: chat.messages,
        chatID: params.chat_id
    }
}) satisfies PageServerLoad



