const nodemailer = require("nodemailer");

async function sendOTP(email) {
  const otp = Math.floor(Math.random() * 1000000);
  const emailBody = `<h2>Your OTP is ${otp}</h2>`;
  Email.send({
    SecureToken: "ea01ecf2-c78d-4d0d-9793-5a20ef4be616",
    // @ts-ignore
    To: username.value,
    From: "akshay.barve@vestanam.com",
    Subject: "OTP Mail",
    Body: emailBody,
  });
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      username: "your_email@example.com",
      otp: "your_otp",
    },
  });

  // Email options
 /* const mailOptions = {
    from: "akshay.barve@vestanam.com",
    to: email,
    subject: "OTP Mail",
    html: emailBody,
  };
*/
  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}

module.exports.sendOTP = sendOTP;
