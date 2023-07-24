export function chatTitlePrompt(messages) {
    return `Summarize the following conversation with at most 5 words.
        The context has to be clear

        This is the conversation:

        'User Question:
        ${messages[0].content}
        
        AI chatbot reply:
        ${messages[1].content}
        '
        
        provide only the keywords, nothing else
        ` 
}
