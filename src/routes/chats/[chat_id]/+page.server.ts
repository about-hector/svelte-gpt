import { fetchChat, getUserID } from '$lib/chatDB';
import type { PageServerLoad } from '../../$types';

export const load = (async ({ params, cookies }) => {
    const currentUser = await getUserID(cookies)
    if (!currentUser) {
        return {
            session: false,
        };
    }
    const chat = await fetchChat(params.chat_id, currentUser);
    if (!chat) {
        return {
            authentication: true,
            authorized: false,
        }
    }
    return {
        authentication: true, 
        authorized: true, 
        chat: chat.messages,
    }
}) satisfies PageServerLoad



