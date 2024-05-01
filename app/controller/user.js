const Users = require("../models/user");

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


  module.exports.signup = (req, res) => {
    const { name, email, phoneNumber, address, query } = req.body;
  
    // Check if all fields are provided
    if (!name || !email || !phoneNumber || !address || !query) {
      return res.status(400).json({ message: 'Please fill in all the details' });
    }
  
    // Add user to the database (dummy implementation)
    users.push({ name, email, phoneNumber, address, query });
    
    // You can add logic to save the user data to a real database here
  
    res.status(200).json({ message: 'User registered successfully' });
  }
  