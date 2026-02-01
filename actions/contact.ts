'use server';

import { z } from 'zod';
import { Resend } from 'resend';

import { ContactState } from '@/types/contact';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.email({
    message: 'Invalid email address',
  }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' }),
  trap: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    trap: formData.get('trap'),
  };

  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.data.trap && validatedFields.data.trap.length > 0) {
    console.log('Bot detected via honeypot');
    return { success: true, message: 'Message sent!' };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Message from ${validatedFields.data.name}`,
      text: validatedFields.data.message,
      replyTo: validatedFields.data.email as string,
    });

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
    };
  }
}
