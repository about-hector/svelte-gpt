import type { Actions } from './$types';
import { ContactFormSubmit } from '$lib/contact_form.js' 

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const sender = data.get('email-input')?.toString();
        const message = data.get('message-body')?.toString();


        if (!message || !sender) {
            throw Error('Incomplete form submission')
        }
        
        const esito = ContactFormSubmit(sender, message); 
        if (esito === "Something went wrong") {
            
        } else if (esito === 'Email sent'){

        }
    }
} satisfies Actions; 
