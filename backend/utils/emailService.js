import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
        console.log('⚠️  Email service not configured. Emails will be logged to console.');
        return null;
    }

    // Handle ESM import of nodemailer
    const transport = nodemailer.createTransport ? nodemailer : nodemailer.default;

    return transport.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        // Add timeouts to prevent hanging
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });
};

// Send email function
export const sendEmail = async (options) => {
    const transporter = createTransporter();

    // If no transporter (email not configured), just log
    if (!transporter) {
        console.log('📧 Email (not sent - configure SMTP):');
        console.log(`   To: ${options.email}`);
        console.log(`   Subject: ${options.subject}`);
        return { success: true, message: 'Email logged (SMTP not configured)' };
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'EventSense <noreply@eventsense.com>',
            to: options.email,
            subject: options.subject,
            html: options.html,
            attachments: options.attachments, // Add support for attachments
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${options.email}`);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, message: 'Failed to send email' };
    }
};
