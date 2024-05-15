const Users = require("../models/user");
const { sendOTP } = require('./sendOTP');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

let predefinedLabels = ['L1', 'L2', 'L3'];
const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTc2NjExNCwiaWF0IjoxNzE1NzY2MTE0fQ.x_4EmzrgS8xjoWQYGK9l5EXP0FM5zwEZZHlmedW4itA';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  // port: 465,
  // secure: true, // use SSL
  auth: {
    user: 'donotreply@introspects.in',
    pass: 'cmzoiodhrihbafmu'
  }
});


/*module.exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const otp = await sendOTP(email); // Send OTP via email
    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
*/


module.exports.login = async (req, res) => {
  // { username } = req.body;

  /*if (!username) {
    return res.status(400).json({ success: false, message: 'Please provide a username' });
  }*/
  username = 'akshay';

  /*try {
    const user = await Users.findOne({ username });

    if (user) {
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.cookie('authToken', token, { httpOnly: true, secure: true }); 

      return res.status(200).json({ success: true, message: 'Login successful', exists: true });
    } else {
      return res.status(400).json({ success: false, message: 'User not found', exists: false });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ success: false, message: 'Error finding user' });
  }
}*/


username = 'akshay'; // Assuming 'username' is defined elsewhere

try {
  const user = await Users.findOne({ username });

  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    
    // Set the cookie with appropriate options
    res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'none' }); // Assuming you need to set SameSite to 'none' for cross-site requests

    return res.status(200).json({ success: true, message: 'Login successful', exists: true });
  } else {
    return res.status(400).json({ success: false, message: 'User not found', exists: false });
  }
} catch (error) {
  console.error('Error finding user:', error);
  return res.status(500).json({ success: false, message: 'Error finding user' });
}
module.exports.requestOtp = async (req, res) => {
  const { email } = req.body;
  console.log("request body",req.body)
//  if (email) {
    try {
      // Check if the email is registered
      const user = await Users.findOne({ email });
      console.log(user);
      if (!user) {
        return res.json({ s: false, m: "Email not registered" });
      }
    var mailOptions = {
      from: '"Introspects No-reply" <donotreply@introspects.in>', // sender address (who sends)
      to: email, // list of receivers (who receives)
      subject: 'Introspects OTP ' + 11111, // Subject line
      // text: 'Hello world ', // plaintext body
      html: 'OTP for login is <b> ' + 11111 + ' </b> valid for 15 minutes' + `</b><br><br><br>This is a system generated mail - please do not reply to this message.<br><br><br>This message contains information that may be privileged or confidential and is the property of the Introspects. It is intended only for the person to whom it is addressed. If you are not the intended recipient, you are not authorized to read, print, retain copy, disseminate, distribute, or use this message or any part thereof. If you receive this message in error, please notify the sender immediately and delete all copies of this message. Introspects does not accept any liability for virus infected mails.`// html body
    };

    // send mail with defined transport object
   /* transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log('Message sent: ' + info.response);
     
    })*/
    return res.json({ s: true, m: "OTP sent" })
  } 
    catch (error) {
    console.error('Error checking email:', error);
    return res.json({ s: false, m: "Error processing request" });
    }
  /*}
  else {
    return res.json({ s: false, m: "Please enter email id" })
  }*/
}


module.exports.signup = async (req, res) => {
  console.log(req.body);
  const { name, username, email, contact, address, query } = req.body;

  if (!name || !username || !email || !contact || !address || !query) {

    return res.json({ s: false, d: 'Please fill in all the details' });

  }

  try {
    await Users.create({ name, username, email, contact, address, query });
    res.json({ s: true, d: 'User registered successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.json({ s: false, d: 'Error registering user' });
  }
}


module.exports.labels = (req, res) => {
  const { label } = req.body;
  if (!label || predefinedLabels.includes(label)) {
    return res.status(400).json({ message: 'Label already exists or is not provided' });
  }
  predefinedLabels.push(label);
  res.status(200).json({ message: 'Label created successfully', label });
}