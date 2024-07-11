const nodemailer = require("nodemailer");
const MailTemplate = require("../models/mailtemp.js"); // Ensure the correct path to the model


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "donotreply@introspects.in",
        pass: "cmzoiodhrihbafmu"
    }
});

const sendEmail = async (req, res) => {
    const { selectedOption, to, cc } = req.body;

    try {
        
        let subject = '';
        let emailBody = '';

        switch (selectedOption) {
            case 'Registration':
                subject = 'Registration Email';
                emailBody = 'Hi, this is a registration email.';
                break;
            case 'Instructions':
                subject = 'Instructions Email';
                emailBody = 'Hi, this is an instructions email.';
                break;
            case 'Reports':
                subject = 'Reports Email';
                emailBody = 'Hi, this is a test email.';
                break;
            default:
                return res.status(400).send({ error: 'Invalid email type selected' });
        }

        
        const mailOptions = {
            from: '"Introspects No-reply" <donotreply@introspects.in>',
            to,
            cc,
            subject,
            text: emailBody
        };

        if (process.env.NODE_ENV === "production") {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Error sending email:", error);
                    return res.json({ s: false, m: "Error sending email" });
                }
                console.log("Message sent: " + info.response);
                return res.json({ s: true, m: "Email sent successfully" });
            });
        } else {
            console.log("Email body:", emailBody);
            console.log("To:", to);
            console.log("CC:", cc);
            return res.json({ s: true, m: "Email sending simulated (development mode)" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.json({ s: false, m: "Error processing request" });
    }
};

module.exports = {
    sendEmail
};

