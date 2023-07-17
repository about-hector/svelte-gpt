import type { Actions } from './$types';
//import { ContactFormSubmit } from '$lib/contact_form.js' 





/*
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const sender = data.get('email-input')?.toString();
        const message = data.get('message-body')?.toString();

        if (!message || !sender) {
            throw Error('Incomplete form submission');
        }
        // await this because it's async 
        const esito = await ContactFormSubmit(sender, message);
        
        if(!esito) {
            return {
                success: false
            }
        }
        return {
            success: true
        }
    }
} satisfies Actions; 
*/
