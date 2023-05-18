import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const ses = new SESv2Client({region: 'eu-central-1'});
const awsVerifiedEmail = 'ettoremihaili@gmail.com'
//since i'm sandboxed, I can onlu use my own email in FromEmailAddress and ToAddresses

export async function ContactFormSubmit(sender: string, message: string) {

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
                    Text: {
                        Data: message // required
                    },
                },
            },
        },
    };

    const result = new SendEmailCommand(input);
    
    try {
        const data = await ses.send(result);
        console.log('Contact form successfully submitted by: ', sender);
        console.log('Email sent to: ', awsVerifiedEmail);
        console.log('Success: ', data.MessageId );
    } catch (error) {
        console.error('The contact form submission failed. Error: ', error);
    }

}

