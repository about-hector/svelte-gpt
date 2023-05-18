//import type { Actions } from './$types';
import {ContactFormSubmit} from '$lib/contact_form' 

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const sender = data.get('email-input');
        const message = data.get('message-body');

        if (!message || !sender) {
            throw Error('Incomplete form submission')
        }
        
        ContactFormSubmit(sender, message); 
    }
}
