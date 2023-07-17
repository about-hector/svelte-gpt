import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OPENAI_API_KEY } from '$env/static/private'
import { chatTitlePrompt } from '$lib/prompt_generators';

const config = new Configuration({
  apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json()
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: chatTitlePrompt(prompt)
  })
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
 
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
