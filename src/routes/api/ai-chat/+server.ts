import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import { SYSTEM_PROMPT } from '$lib/prompt_generators'
import { json } from '@sveltejs/kit';

// Create an OpenAI API client
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

// Set the runtime to edge for best performance, bugs the whole app though
export const config = {
  runtime: 'edge'
};

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
            ],
            temperature: 0.4,
            frequency_penalty: 0.5,
            presence_penalty: -0.5,
            max_tokens: 2000,
            //user
        });

        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response)
       // Respond with the stream
        return new StreamingTextResponse(stream);
    } catch (e) {
        // Check if the error is an APIError
        if (e instanceof OpenAI.APIError) {
            const { name, status, headers, message } = e;
            return json({ name, status, headers, message }, { status });
        } else {
            throw e;
        }
    }
}
