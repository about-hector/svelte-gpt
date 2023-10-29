import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import { SYSTEM_PROMPT } from '$lib/prompt_generators'

// Create an OpenAI API client
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

// Set the runtime to edge for best performance
//export const config = {
//  runtime: 'edge'
//};

export async function POST({ request }: { request: Request }) {
    try {
        const { messages, model } = await request.json();
        const conversation = messages.map((message) => ({
            content: message.content,
            role: message.role
        }))
        // Ask OpenAI for a streaming chat completion given the prompt
        const response = await openai.chat.completions.create({
            model: model,
            stream: true,
            //TODO: find a way to process the messages to reduce the overall length while maintaining context
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT
                },
                ...conversation
            ]
            //user
            //max-tokens
        });

        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response, {
            onStart: async () => {
                //save the last prompt to the database
                //await saveMessage(prompt)
                //if (!chatId && messages.length <= 1) {
                //    const chat = await createChat(messages[0], userID);
                //    const data = await chat.json();
                //    console.log(data)
                //    if (data && data.chat.id) {
                //        chatId = data.chat.id;
                //    }
                //    return;
                //}
                //const chat = await updateChat(messages[messages.length - 1], userID, chatId)
                //const data = await chat.json();
            },
            onCompletion: async (completion) => {
                //save the reply received in the database
                //await saveMessage(answer)
                //const answer = {
                //    id: crypto.randomUUID(),
                //    role: 'assistant',
                //    createdAt: new Date(),
                //    content: completion,
                //    openai_unique_id: crypto.randomUUID()
                //parent:
                //}
                //const chat = await updateChat(answer, userID, chatId)
            }
        });
        //console.log('This message used the ' + model + 'OpenAI model');

        //TODO: process the stream on my own
        //for await (const part of response) {
        //console.dir(part, { depth: 3})
        //process.stdout.write(part.choices[0]?.delta?.content || '');
        //}
        //process.stdout.write('\n');

        // Respond with the stream
        return new StreamingTextResponse(stream);
    } catch (e) {
        // Check if the error is an APIError
        if (e instanceof OpenAI.APIError) {
            const { name, status, headers, message } = e;
            return Response.json({ name, status, headers, message }, { status });
        } else {
            throw e;
        }
    }
}
