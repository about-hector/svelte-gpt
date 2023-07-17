
import { fetchChat, getUserID } from '$lib/chatDB';
import type { PageServerLoad } from '../../$types';
import { redirect } from "@sveltejs/kit";
import { prisma } from '$lib/chatDB';

export const load = (async ({ params, cookies }) => {
    const currentUser = await getUserID(cookies)
    if (currentUser === 'not-signed-in') {
        return {
            previousConversation: 'not-signed-in'
        };
    }
    const chat = await fetchChat(params.chat_id, currentUser);
    if (!chat) {
        return {
            previousConversation: 'not-authorized'
        }
    }
    return {
        previousConversation: chat.messages,
    }
}) satisfies PageServerLoad



