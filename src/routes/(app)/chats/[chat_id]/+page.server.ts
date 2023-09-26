import { fetchChat, getUserID } from '$lib/chatDB';
import { createMapping, reconstructTree } from '$lib/chat_tree';

export const load = async ({ params, cookies }) => {
    const userId = await getUserID(cookies);

    if (userId) {
        const chat = await fetchChat(params.chat_id, userId);

        //if there's no such chatId or the chat isn't owned by the userId passed
        if (!chat) {
            return {
                auth: true,
                authorized: false,
                redirectTo: '/',
                chatID: params.chat_id
            };
        }
        if (params.chat_id === 'authorization-test') {
            return {
                auth: true,
                authorized: false,
                redirectTo: '/',
                chatID: params.chat_id,
                chat: chat.messages
            };
        }



        const mapping = createMapping(chat.messages) 

        const messages = reconstructTree(mapping, chat.currentNode)


        return {
            auth: true,
            authorized: true,
            conversation: chat.messages,
            lastBranch: messages,
            chatID: params.chat_id,
            model: chat.model,
            mapping: mapping,
            currentNode: chat.currentNode
        };
    }
};
