const nodemailer = require("nodemailer");

/**
 * Create transporter instance
 * Using Gmail SMTP in this example.
 *
 * For production:
 * - Gmail App Password
 * - SendGrid
 * - Resend
 * - Mailgun
 * are recommended.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Verify transporter connection
 * Runs when server starts.
 */
const verifyEmailConnection = async () => {
  try {
    await transporter.verify();

    console.log("✅ Email service connected successfully");
  } catch (error) {
    console.error("❌ Email service connection failed");

    console.error(error.message);
  }
};

/**
 * Send email utility
 *
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.html
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email sending error:", error);

    throw new Error("Failed to send email");
  }
};

module.exports = {
  transporter,
  verifyEmailConnection,
  sendEmail,
};