import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(to: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to The Fringe Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000; text-align: center;">Welcome to The Fringe!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for subscribing to our newsletter! You'll now receive the latest beauty tips, course updates, and exclusive offers.</p>
        <p>What you can expect:</p>
        <ul>
          <li>💄 Weekly beauty tips and tutorials</li>
          <li>📚 Early access to new courses</li>
          <li>🎯 Exclusive member discounts</li>
          <li>✨ Industry news and trends</li>
        </ul>
        <p>Best regards,<br>The Fringe Team</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendStudentInvitation(to: string, name: string, tempPassword: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to The Fringe Academy!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000; text-align: center;">Welcome to The Fringe Academy!</h1>
        <p>Hi ${name},</p>
        <p>You have been enrolled in The Fringe Academy! Here are your login credentials:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${to}</p>
          <p><strong>Temporary Password:</strong> ${tempPassword}</p>
        </div>
        <p>Please log in to your student portal and change your password immediately.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/student-login" style="color: #000; text-decoration: underline;">Access Student Portal</a></p>
        <p>Best regards,<br>The Fringe Team</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendCourseCompletionEmail(to: string, name: string, courseName: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Congratulations on Course Completion!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000; text-align: center;">Congratulations!</h1>
        <p>Hi ${name},</p>
        <p>Congratulations on successfully completing the <strong>${courseName}</strong> course!</p>
        <p>Your certificate is now available in your student portal.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/student-portal" style="color: #000; text-decoration: underline;">View Certificate</a></p>
        <p>Best regards,<br>The Fringe Team</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}