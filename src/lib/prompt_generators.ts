export function chatTitlePrompt(messages) {
    return `You are a 'title generator'.
        Your goal is to understand the topic of a conversation and summarize it.

        Use less than 5 words.
        Do not use punctuation unless necessary.

        A user needs your help generating a title for the following conversation:
        \`
        User: ${messages[0].content}
        
        LLM AI Answer: ${messages[1].content}
        \`
        ` 
}

export const systemPrompt = {
    role: 'system',
    content: `You are a personal assistant. 


    `
}

