import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OPENAI_API_KEY } from '$env/static/private'
import { chatTitlePrompt } from '$lib/prompt_generators';
import { getUserID, prisma } from '$lib/chatDB'
import { json } from '@sveltejs/kit';

const config = new Configuration({
    apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(config)

export async function POST({ request, cookies }) {
    // Extract the `prompt` from the body of the request
    const { messages, chatID } = await request.json()
    const userID = await getUserID(cookies)
    const myPrompt = chatTitlePrompt(messages);

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0.1,
        max_tokens: 10,
        prompt: JSON.stringify(myPrompt),
    })
    const title = (await response.json()).choices[0].text
    const updateChat = await prisma.chat.update({
        where: {
            id: chatID,
            user_id: userID
        },
        data: {
            title: title 
        },
        select: {
            title: true
        }
    })
    // Convert the response into a friendly text-stream
    // Respond with the stream
    
    return json({title: updateChat.title}, {status: 200}) 

}






