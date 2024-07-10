const nodemailer = require("nodemailer");
const MailTemplate = require("../models/mailtemp.js"); // Ensure the correct path to the model

const sendEmail = async (req, res) => {
    const { selectedOption, to, cc, } = req.body;

    try {
        // Fetch the email template from the database
        const template = await MailTemplate.findOne({ name: selectedOption });

        if (!template) {
            return res.status(400).send({ error: 'Invalid email type selected' });
        }
 // Generate the email body based on the selected option
 let emailBody = '';
 switch (selectedOption) {
     case 'Registration':
         emailBody = 'Hi, this is a testing mail for mail type: Registration';
         break;
     case 'Instructions':
         emailBody = 'Hi, this is a testing mail for mail type: Instructions';
         break;
     case 'Reports':
         emailBody = 'Hi, this is a testing mail for mail type: Reports';
         break;
     default:
         emailBody = 'Hi, this is a testing mail for an unknown mail type';
 }
        // Configure your email transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: 'devavratthokal30@gmail.com', // your email address
                pass: 'Chhaya@24'   // your email password
            }
        });

        // Define the mail options
        const mailOptions = {
            from: 'devavratthokal30@gmail.com',
            to,
            cc,
            subject: template.subject,
            text:emailBody
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: 'Email sent successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send email', details: error });
    }
};

module.exports = {
    sendEmail
};
