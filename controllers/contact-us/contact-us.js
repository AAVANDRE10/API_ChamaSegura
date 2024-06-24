const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendContactEmail = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    // Get user information from token
    const userId = JwtUtils.getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all ICNF users' emails
    const representatives = await prisma.users.findMany({
      where: {
        type: 'ICNF',
      },
    });
    const emails = representatives.map(rep => rep.email);

    if (emails.length === 0) {
      return res.status(400).json({ error: 'No ICNF representatives found' });
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Setup email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: emails.join(','),
      subject: `Chama Segura - ${subject}`,
      text: `${message}\n\nName: ${user.name}\nEmail: ${user.email}\nNIF: ${user.nif}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  sendContactEmail,
};