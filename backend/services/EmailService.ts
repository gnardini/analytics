import { Resend } from 'resend';
import { RESEND_API_KEY } from '@backend/config';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const EmailService = {
  sendEmail: async function (to: string, subject: string, body: string) {
    try {
      if (!resend) {
        console.warn('Resend API key not found. Email not sent.');
        return;
      }
      await resend.emails.send({
        from: 'Gonza from Phinxer <gonza@kamaraapp.com>',
        to,
        subject,
        html: body,
      });

      console.info('Email sent successfully!');
    } catch (err) {
      console.error(`Error sending email: ${err}`);
    }
  },
};
