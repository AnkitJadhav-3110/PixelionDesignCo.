export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  botcheck?: string; // honeypot
}

export interface SubmissionResult {
  success: boolean;
  message: string;
}

export const SERVICE_OPTIONS = [
  'Graphic Design',
  'Branding & Visual Identity',
  'UI/UX & Digital Product Design',
  'Social Media Design',
  'Print & Packaging Design',
  'Invitation & Event Design',
  'Other',
] as const;

export async function submitToWeb3Forms(payload: InquiryPayload): Promise<SubmissionResult> {
  // Check honeypot
  if (payload.botcheck) {
    return {
      success: false,
      message: 'Spam submission detected.',
    };
  }

  // Access key from environment or fallback default configured key
  const rawAccessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    'dc8aa061-daa3-4e31-b9a1-ab7285d66cd2';

  // Sanitize: strip surrounding quotes and trim any whitespace/newlines that trigger "extra space" error
  const accessKey = String(rawAccessKey).replace(/^["']|["']$/g, '').trim();

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const formattedBody = `NEW PROJECT INQUIRY

Name: ${payload.name.trim()}
Email: ${payload.email.trim()}
Phone: ${payload.phone?.trim() || 'Not provided'}
Company: ${payload.company?.trim() || 'Not provided'}
Requested Service: ${payload.service || 'Not specified'}

Message:
${payload.message.trim()}

Submitted: ${timestamp}`;

  const requestBody = {
    access_key: accessKey,
    subject: 'New Project Inquiry — Pixelion Design Co.',
    from_name: `${payload.name.trim()} via Pixelion Design Co.`,
    replyto: payload.email.trim(),
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || '',
    company: payload.company?.trim() || '',
    service: payload.service || '',
    message: formattedBody,
    botcheck: '',
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: "Your enquiry has been received successfully. We'll get back to you soon.",
      };
    } else {
      const isKeyError =
        result.message?.toLowerCase().includes('key') ||
        result.message?.toLowerCase().includes('invalid');
      return {
        success: false,
        message: isKeyError
          ? 'Unable to submit the form at the moment. Please reach out to us directly via WhatsApp (+91 7016131424) or email (pixeliondesignco.1702@gmail.com).'
          : result.message ||
            'Something went wrong. Please try again or contact us directly via WhatsApp or email.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly via WhatsApp or email.',
    };
  }
}
