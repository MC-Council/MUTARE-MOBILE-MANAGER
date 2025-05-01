// backend/routes/emailRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  // Configure your email service provider details here
  service: 'Webmail', //'gmail', 'Outlook', 'your_email_service'
  auth: {
    user: 'ict@mutarecity.org',// email address
    pass: '', // email password or an application-specific password
  },
});

router.post('/send-device-confirmation', async (req, res) => {
  const { to, deviceName } = req.body;

  if (!to || !deviceName) {
    return res.status(400).json({ success: false, message: 'Recipient email and device name are required.' });
  }

  const mailOptions = {
    from: 'ict@mutarecity.org', //  Make sure this matches the 'user' above
    to: to,
    subject: 'Device Capture Confirmation',
    html: `<p>Your device <strong>${deviceName}</strong> has been successfully captured in our system.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    res.json({ success: true, message: 'Confirmation email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send confirmation email.  Error: ' + error.message }); // Include the error message for debugging
  }
});

export default router;
