export function chatTitlePrompt(messages) {
    return `Suggest a short title (less than 30 character) to summarize
    the content of this chat between you and an user: 
    
    ${messages.map((message) => {
        return `
            ${message.role}:
            "${message.content}"

            \n\n
        `

    } )}

    `

}
