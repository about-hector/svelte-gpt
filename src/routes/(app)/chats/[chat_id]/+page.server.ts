import { fetchChat, getUserID } from '$lib/chatDB';
import { createMapping, reconstructTree } from '$lib/chat_tree';

export const load = async ({ params, cookies, event }) => {
    //move the user auth logic in a middleware / something more optimized and clean
    const userId = await getUserID(cookies);


    if (userId) {
        const chat = await fetchChat(params.chat_id, userId);
        //if a chat with chat_id wasn't found or the chat isn't owned by the userId passed (the latter is checked by the database logic)
        if (!chat) {
            return {
                auth: true,
                authorized: false,
                redirectTo: '/',
                chatID: params.chat_id
            };
        }

        /****************************************************
            * for my tests (attach integration tests too later on)
        * causes some issued on domain/chats/authorization-test, I can see 
        * the default model and the input bar. just change them to smth else
        ************************************************************/
        if (params.chat_id === 'authorization-test') {
            return {
                auth: true,
                authorized: false,
                //redirectTo: '/',
                //chatID: params.chat_id,
                //chat: chat.messages
            };
        }



        const mapping = createMapping(chat.messages)

        const messages = reconstructTree(mapping, chat.currentNode)


        return {
            auth: true,
            authorized: true,
            //conversation: chat.messages,
            model: chat.model,
            chatID: params.chat_id,
            chatHashmap: mapping,
            currentNode: chat.currentNode,
            lastBranch: messages
        };
    }
};
