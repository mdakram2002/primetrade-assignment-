const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  auth: {
    user: process.env.EMAIL_USER || 'test@ethereal.email',
    pass: process.env.EMAIL_PASS || 'password'
  }
});

exports.sendWelcomeEmail = async (email, username) => {
  if (process.env.NODE_ENV === 'test') return;

  try {
    const mailOptions = {
      from: '"Task Manager" <noreply@taskmanager.com>',
      to: email,
      subject: 'Welcome to Task Manager!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Task Manager, ${username}! 🎉</h2>
          <p>Thank you for registering with Task Manager. We're excited to help you organize your tasks efficiently.</p>
          <p>You can now:</p>
          <ul>
            <li>Create and manage your tasks</li>
            <li>Set priorities and due dates</li>
            <li>Track your progress</li>
            <li>Organize tasks with tags</li>
          </ul>
          <p>Get started by logging into your account and creating your first task!</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            If you didn't create an account, please ignore this email.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
  }
};

exports.sendPasswordResetEmail = async (email, resetToken) => {
  // Implementation for password reset
  console.log('Password reset requested for:', email);
  console.log('Reset token:', resetToken);
};

module.exports = exports;