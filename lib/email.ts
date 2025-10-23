import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
}

interface QuoteEmailData {
  insuranceType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coverageAmount?: string;
  startDate?: string;
  additionalNotes?: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendQuoteNotification(data: QuoteEmailData): Promise<boolean> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'quotes@tgiagency.com';
  
  if (!apiKey) {
    console.warn('SendGrid API key not configured. Skipping email notification.');
    return false;
  }

  const emailContent = `
New Quote Request Received

Insurance Type: ${data.insuranceType}

Contact Information:
-------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

Address:
--------
${data.address}
${data.city}, ${data.state} ${data.zipCode}

Quote Details:
-------------
${data.coverageAmount ? `Coverage Amount: ${data.coverageAmount}\n` : ''}
${data.startDate ? `Desired Start Date: ${data.startDate}\n` : ''}
${data.additionalNotes ? `\nAdditional Notes:\n${data.additionalNotes}` : ''}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
View in Supabase: https://supabase.com/dashboard/project/oohttpknzjchpdfogled/editor
  `.trim();

  const msg = {
    to: notificationEmail,
    from: {
      email: 'noreply@tgiagency.com',
      name: 'TGI Agency Website'
    },
    replyTo: data.email,
    subject: `New ${data.insuranceType} Quote Request - ${data.firstName} ${data.lastName}`,
    text: emailContent,
    html: emailContent.replace(/\n/g, '<br>'),
  };

  try {
    await sgMail.send(msg);
    console.log(`Quote notification email sent to ${notificationEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send quote notification email:', error);
    return false;
  }
}

export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'quotes@tgiagency.com';
  
  if (!apiKey) {
    console.warn('SendGrid API key not configured. Skipping email notification.');
    return false;
  }

  const emailContent = `
New Contact Form Submission

Contact Information:
-------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
--------
${data.message}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
${process.env.SUPABASE_DASHBOARD_URL ? `View in Supabase: ${process.env.SUPABASE_DASHBOARD_URL}` : ''}
  `.trim();

  const msg = {
    to: notificationEmail,
    from: {
      email: 'noreply@tgiagency.com',
      name: 'TGI Agency Website'
    },
    replyTo: data.email,
    subject: `New Contact Form Submission - ${data.name}`,
    text: emailContent,
    html: emailContent.replace(/\n/g, '<br>'),
  };

  try {
    await sgMail.send(msg);
    console.log(`Contact notification email sent to ${notificationEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return false;
  }
}
