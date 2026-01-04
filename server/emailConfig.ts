/**
 * Email Configuration Service
 * Handles SMTP configuration and email sending via Zoho Mail
 */

import nodemailer from "nodemailer";

// Zoho Mail SMTP Configuration
export const zohoMailConfig = {
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "ashim@techbucket.com.np",
    pass: process.env.EMAIL_PASSWORD || "Uzumaki@123",
  },
};

// Create transporter instance
let transporter: nodemailer.Transporter | null = null;

export function getEmailTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(zohoMailConfig);
  }
  return transporter;
}

// Email templates
export const emailTemplates = {
  quoteRequest: (data: {
    customerName: string;
    customerEmail: string;
    productName?: string;
    companyName?: string;
    quantity?: number;
    message?: string;
  }) => ({
    subject: `New Quote Request from ${data.customerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Quote Request Received</h2>
        <p>You have received a new quote request from:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; font-weight: bold;">Customer Name:</td>
            <td style="padding: 10px;">${data.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></td>
          </tr>
          ${data.companyName ? `<tr style="background-color: #f5f5f5;"><td style="padding: 10px; font-weight: bold;">Company:</td><td style="padding: 10px;">${data.companyName}</td></tr>` : ""}
          ${data.productName ? `<tr><td style="padding: 10px; font-weight: bold;">Product:</td><td style="padding: 10px;">${data.productName}</td></tr>` : ""}
          ${data.quantity ? `<tr style="background-color: #f5f5f5;"><td style="padding: 10px; font-weight: bold;">Quantity:</td><td style="padding: 10px;">${data.quantity}</td></tr>` : ""}
        </table>
        ${data.message ? `<div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #007bff;">
          <p style="margin: 0; font-weight: bold;">Message:</p>
          <p style="margin: 10px 0 0 0;">${data.message}</p>
        </div>` : ""}
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Please log in to your admin panel to respond to this quote request.
        </p>
      </div>
    `,
  }),

  contactSubmission: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => ({
    subject: `New Contact Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; font-weight: bold;">Name:</td>
            <td style="padding: 10px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr style="background-color: #f5f5f5;"><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;">${data.phone}</td></tr>` : ""}
          <tr>
            <td style="padding: 10px; font-weight: bold;">Subject:</td>
            <td style="padding: 10px;">${data.subject}</td>
          </tr>
        </table>
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #28a745;">
          <p style="margin: 0; font-weight: bold;">Message:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Please log in to your admin panel to view and respond to this contact.
        </p>
      </div>
    `,
  }),

  supportRequest: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    priority: string;
  }) => ({
    subject: `New Support Request [${data.priority.toUpperCase()}]: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Support Request</h2>
        <div style="margin: 20px 0; padding: 15px; background-color: ${
          data.priority === "high" ? "#fff3cd" : "#e7f3ff"
        }; border-left: 4px solid ${data.priority === "high" ? "#ff6b6b" : "#007bff"};">
          <p style="margin: 0; font-weight: bold;">Priority: <span style="color: ${
            data.priority === "high" ? "#ff6b6b" : "#007bff"
          };">${data.priority.toUpperCase()}</span></p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; font-weight: bold;">Name:</td>
            <td style="padding: 10px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr style="background-color: #f5f5f5;"><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;">${data.phone}</td></tr>` : ""}
          <tr>
            <td style="padding: 10px; font-weight: bold;">Subject:</td>
            <td style="padding: 10px;">${data.subject}</td>
          </tr>
        </table>
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #dc3545;">
          <p style="margin: 0; font-weight: bold;">Issue Description:</p>
          <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Please log in to your admin panel to view and respond to this support request.
        </p>
      </div>
    `,
  }),
};

/**
 * Send email via Zoho Mail
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from: string = process.env.EMAIL_USER || "ashim@techbucket.com.np"
) {
  try {
    const transporter = getEmailTransporter();

    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Verify email configuration
 */
export async function verifyEmailConfiguration() {
  try {
    const transporter = getEmailTransporter();
    await transporter.verify();
    console.log("Email configuration verified successfully");
    return { success: true };
  } catch (error) {
    console.error("Email configuration verification failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
