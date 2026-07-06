const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const parseUserAgent = (ua) => {
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  // Detect browser
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  // Detect OS
  if (ua.includes("Windows NT 10")) os = "Windows 10/11";
  else if (ua.includes("Windows NT 6.1")) os = "Windows 7";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { browser, os };
};

const sendLoginNotification = async ({
  attemptedEmail,
  ip,
  userAgent,
  time,
  status,
  userName = null,
  userRole = null,
}) => {
  try {
    const { browser, os } = parseUserAgent(userAgent);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #001E2B; border-radius: 12px; overflow: hidden; }
          .header { background: #0D2137; padding: 24px; border-bottom: 1px solid #1C3347; }
          .header h1 { color: #00ED64; margin: 0; font-size: 20px; }
          .header p { color: #89979B; margin: 4px 0 0; font-size: 13px; }
          .body { padding: 24px; }
          .status { padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-weight: bold; font-size: 15px; }
          .status.success { background: #00ED64/10; color: #00ED64; border: 1px solid #00ED6433; }
          .status.failed { background: #ef444410; color: #ef4444; border: 1px solid #ef444433; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1C3347; }
          .detail-label { color: #89979B; font-size: 13px; }
          .detail-value { color: #ffffff; font-size: 13px; font-weight: 500; }
          .footer { padding: 16px 24px; background: #0D2137; text-align: center; }
          .footer p { color: #89979B; font-size: 12px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Login Attempt Detected</h1>
            <p>Someone tried to access your Timothy CMS dashboard</p>
          </div>
          <div class="body">
            <div class="status ${status.includes("✅") ? "success" : "failed"}">
              ${status}
            </div>
            <div class="detail-row">
              <span class="detail-label">Attempted Email</span>
              <span class="detail-value">${attemptedEmail}</span>
            </div>
            ${userName ? `
            <div class="detail-row">
              <span class="detail-label">User Name</span>
              <span class="detail-value">${userName}</span>
            </div>` : ""}
            ${userRole ? `
            <div class="detail-row">
              <span class="detail-label">Role</span>
              <span class="detail-value">${userRole}</span>
            </div>` : ""}
            <div class="detail-row">
              <span class="detail-label">IP Address</span>
              <span class="detail-value">${ip}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Browser</span>
              <span class="detail-value">${browser}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Operating System</span>
              <span class="detail-value">${os}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">User Agent</span>
              <span class="detail-value" style="font-size:11px; max-width:300px; word-break:break-all;">${userAgent}</span>
            </div>
          </div>
          <div class="footer">
            <p>If this wasn't you, please secure your account immediately.</p>
            <p style="margin-top:4px;">Timothy CMS Security Alert</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Timothy CMS Security" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `${status.includes("✅") ? "✅ Successful" : "⚠️ Failed"} Login Attempt - Timothy CMS`,
      html,
    });

    console.log(`[Auth] Login notification sent to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    // Never crash the login flow because of email failure
    console.error("[Auth] Failed to send login notification:", error.message);
  }
};

module.exports = { sendLoginNotification };