const Users = require("../models/user");

let predefinedLabels = ['L1', 'L2', 'L3'];

module.exports.login = (req, res) => {
    const { username } = req.body;
    const userExists = users.some(user => user.username === username);

    Users.findOne({username:req.body.username})
    .then((err, user)=>{
      if (userExists) {
        res.status(200).json({ exists: true });
      } else {
        res.status(404).json({ exists: false });
      }
    })
  }


  module.exports.signup = async (req, res) => {
    const { name, email, contact, address, query } = req.body;
  
    if (!name || !email || !contact || !address || !query) {
      return res.json({ s: false, d: 'Please fill in all the details' });
    }
  
    try {
      await Users.create({ name, email, phoneNumber, address, query });
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