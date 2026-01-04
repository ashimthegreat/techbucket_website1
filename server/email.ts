import { notifyOwner } from "./_core/notification";

/**
 * Email notification service
 * Handles sending notifications to admin for quotes, contacts, and support requests
 */

export async function sendQuoteNotification(quoteData: {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName?: string;
  companyName?: string;
  quantity?: number;
  message?: string;
}) {
  const content = `
New Quote Request Received:

Customer Name: ${quoteData.customerName}
Email: ${quoteData.customerEmail}
Phone: ${quoteData.customerPhone}
${quoteData.companyName ? `Company: ${quoteData.companyName}` : ""}
${quoteData.productName ? `Product: ${quoteData.productName}` : ""}
${quoteData.quantity ? `Quantity: ${quoteData.quantity}` : ""}

Message:
${quoteData.message || "No additional message"}

---
Quote ID: #${quoteData.id}
View in admin panel: /admin/dashboard?tab=quotes
`;

  return await notifyOwner({
    title: `New Quote Request from ${quoteData.customerName}`,
    content,
  });
}

export async function sendContactNotification(contactData: {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const content = `
New Contact Submission Received:

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ""}

Subject: ${contactData.subject}

Message:
${contactData.message}

---
Contact ID: #${contactData.id}
View in admin panel: /admin/dashboard?tab=contacts
`;

  return await notifyOwner({
    title: `New Contact from ${contactData.name}`,
    content,
  });
}

export async function sendSupportNotification(supportData: {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  priority: string;
}) {
  const content = `
New Support Request Received:

Name: ${supportData.name}
Email: ${supportData.email}
${supportData.phone ? `Phone: ${supportData.phone}` : ""}

Subject: ${supportData.subject}
Priority: ${supportData.priority.toUpperCase()}

Message:
${supportData.message}

---
Support ID: #${supportData.id}
View in admin panel: /admin/dashboard?tab=support
`;

  return await notifyOwner({
    title: `New Support Request (${supportData.priority}) from ${supportData.name}`,
    content,
  });
}
