import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { emailTemplate } from './email_templates/contact_form_submission';
const ses = new SESv2Client({region: 'eu-central-1'});
const awsVerifiedEmail = 'ettoremihaili@gmail.com';
//since i'm sandboxed, I can onlu use my own email in FromEmailAddress and ToAddresses

export async function ContactFormSubmit(sender: string, message: string) {
    
    const emailBody = emailTemplate
        .replace('{email}', sender)
        .replace('{message}', message);

    const input = { // SendEmailRequest
        FromEmailAddress: awsVerifiedEmail,
        Destination: { // Destination
            ToAddresses: [
                awsVerifiedEmail, 
                //sender,
            ],
        },
        ReplyToAddresses: [ sender ],
        Content: { // EmailContent
            Simple: { // Message
                Subject: { // Content
                    Data: `dev-portfolio: Contact Form Submission by ${sender}` // required
                },
                Body: { // Body
                    Html: {
                        Data: emailBody // required
                    },
                },
            },
        },
    };

    const result = new SendEmailCommand(input);
    
    try {
        const data = await ses.send(result).then(() => {
        console.log('Contact form successfully submitted by: ', sender);
        console.log('Email sent to: ', awsVerifiedEmail);
        });
        console.log('Success: ', data);
        return 'Email sent';
    } catch (error) {
        console.error('The contact form submission failed. Error: ', error);
        if (error) {
            return "Something went wrong"; 
        }
    } 

}

