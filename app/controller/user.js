// const Users = require("../models/user");
const { sendOTP } = require('./sendOTP');
const nodemailer = require('nodemailer')


let predefinedLabels = ['L1', 'L2', 'L3'];


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


// module.exports.login = async (req, res) => {
//   // { username } = req.body;

//   /*if (!username) {
//     return res.status(400).json({ success: false, message: 'Please provide a username' });
//   }*/
//   username = 'akshay';

//   try {
//     const user = await Users.findOne({ username });

//     if (user) {
//       const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
//       res.cookie('authToken', token, { httpOnly: true, secure: true,sameSite: 'none' }); 

//       return res.status(200).json({ success: true, message: 'Login successful', exists: true });
//     } else {
//       return res.status(400).json({ success: false, message: 'User not found', exists: false });
//     }
//   } catch (error) {
//     console.error('Error finding user:', error);
//     return res.status(500).json({ success: false, message: 'Error finding user' });
//   }
// }

const jwt = require('jsonwebtoken');
const Users = require("../models/user"); // Import the Users model
const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTc2NjExNCwiaWF0IjoxNzE1NzY2MTE0fQ.x_4EmzrgS8xjoWQYGK9l5EXP0FM5zwEZZHlmedW4itA'; // Make sure this key matches the one in auth.js
username = 'akshay';
/*
module.exports.login = async (req, res) => {

  res.cookie('myCookie','cookieValue',{
    sameSite:'none',
    secure: false,
    httpOnly: true,
    maxAge: 1000*60*60*24,
    path:'/',
  });
  return res.send('Cookie is set');

  const { username } = req.body; // Uncommented this line to get username from request body

  if (!username) {
    return res.status(400).json({ success: false, message: 'Please provide a username' });
  }

  try {
    const user = await Users.findOne({ username });

    if (user) {
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'none' });

      return res.status(200).json({ success: true, message: 'Login successful', exists: true });
    } else {
      return res.status(400).json({ success: false, message: 'User not found', exists: false });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ success: false, message: 'Error finding user' });
  }
};
*/

module.exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide a username' });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found', exists: false });
    }

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });

    return res.status(200).json({ success: true, message: 'Login successful', exists: true });
  } catch (error) {
    console.error('Error processing login:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/*
module.exports.requestOtp = async (req, res) => {
  const { email } = req.body;
  return res.json({ s: true, m: "OTP sent" })
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
     
    })*//*
return res.json({ s: true, m: "OTP sent" })
} 
catch (error) {
console.error('Error checking email:', error);
return res.json({ s: false, m: "Error processing request" });
}
/*}
else {
return res.json({ s: false, m: "Please enter email id" })
}*//*
}
*/
/* 
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);
module.exports.requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ s: false, m: "Please enter email id" });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.json({ s: false, m: "Email not registered. Please sign up first." });
    }

    const otp = generateOtp();

    var mailOptions = {
      from: '"Introspects No-reply" <donotreply@introspects.in>', // sender address
      to: email, // list of receivers
      subject: 'Introspects OTP ' + otp, // Subject line
      html: `OTP for login is <b>${otp}</b> valid for 15 minutes`
    };

    if (process.env.NODE_ENV == "production") {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Error sending email:', error);
          return res.json({ s: false, m: "Error sending OTP" });
        }
        console.log('Message sent: ' + info.response);
        return res.json({ s: true, m: "OTP sent", d: {} });
      });
    } else {
      console.log(otp)
      return res.json({ s: true, m: "OTP sent", d: {} });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return res.json({ s: false, m: "Error processing request" });
  }
};*/

const otpStore = {};
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

module.exports.requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ s: false, m: "Please enter email id" });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      console.log('ALERT: Email not registered:', email);
      return res.json({ s: false, m: "ALERT: Email not registered. Please sign up first." });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 15 * 60 * 1000; // OTP is valid for 15 minutes

    otpStore[email] = { otp, otpExpiry };

    var mailOptions = {
      from: '"Introspects No-reply" <donotreply@introspects.in>', // sender address
      to: email, // list of receivers
      subject: 'Introspects OTP ' + otp, // Subject line
      html: `OTP for login is <b>${otp}</b> valid for 15 minutes`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error sending email:', error);
        return res.json({ s: false, m: "Error sending OTP" });
      }
      console.log('Message sent: ' + info.response);
      return res.json({ s: true, m: "OTP sent" });
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return res.json({ s: false, m: "Error processing request" });
  }
};

module.exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ s: false, m: "Please provide email and OTP" });
  }

  const storedOtpData = otpStore[email];

  if (!storedOtpData) {
    return res.json({ s: false, m: "OTP not found or expired" });
  }

  const { otp: storedOtp, otpExpiry } = storedOtpData;

  if (Date.now() > otpExpiry) {
    delete otpStore[email]; // Clean up expired OTP
    return res.json({ s: false, m: "OTP expired" });
  }

  if (otp === storedOtp) {
    delete otpStore[email]; // Clean up used OTP
    return res.json({ s: true, m: "OTP verified" });
  } else {
    return res.json({ s: false, m: "Invalid OTP" });
  }
};


module.exports.signup = async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNumber, address, query } = req.body;

  if (!name || !email || !phoneNumber || !address || !query) {

    return res.json({ s: false, d: 'Please fill in all the details' });

  }

  try {
    let user1 = await Users.create({ name, email, phoneNumber, address, query });
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