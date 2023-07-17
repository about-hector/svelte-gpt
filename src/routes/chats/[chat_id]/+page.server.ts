
import {fetchChat} from '$lib/chatDB';
import type { PageServerLoad } from '../../$types';

export const load = ( async ({ params }) => {
    console.log(params)
    const chatHistory = await fetchChat(params.chat_id);    
    if (chatHistory) {
        return {
            previousConversation: chatHistory.messages,
        }
    }
}) satisfies PageServerLoad
