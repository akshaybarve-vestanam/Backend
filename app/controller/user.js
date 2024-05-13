const Users = require("../models/user");
const { sendOTP } = require('./sendOTP');

let predefinedLabels = ['L1', 'L2', 'L3'];


module.exports.sendOTP = async (req, res) => {
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



module.exports.login = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Please provide a username' });
  }

  try {
    const user = await Users.findOne({ username });
    
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ success: false, message: 'Error finding user' });
  }
}


  module.exports.signup = async (req, res) => {
    console.log(req.body);
    const { name, username, email, contact, address, query } = req.body;
  
    if (!name || !username || !email || !contact || !address || !query ) {
      
      return res.json({ s: false, d: 'Please fill in all the details' });

    }
  
    try {
      await Users.create({ name, username , email, contact, address, query });
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