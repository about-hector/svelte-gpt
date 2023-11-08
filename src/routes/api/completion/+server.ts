import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import { chatTitlePrompt } from '$lib/prompt_generators';
import { getUserID } from '$lib/chatDB';
import { prisma } from '$lib/server/prisma-client';
import { json } from '@sveltejs/kit';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request, cookies }) {
	// Extract the `prompt` from the body of the request
	const { messages, chatID } = await request.json();
	const userID = await getUserID(cookies);
	const myPrompt = chatTitlePrompt(messages);

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.completions.create({
		model: 'text-davinci-003',
		temperature: 0.2,
		max_tokens: 15,
		prompt: JSON.stringify(myPrompt)
	});

	//const title = (await response.json()).choices[0].text;
    const title = response.choices[0].text;
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
	});
	// Convert the response into a friendly text-stream
	// Respond with the stream

	return json({ title: updateChat.title }, { status: 200 });
}
