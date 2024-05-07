const Users = require("../models/candidates");

module.exports.candidates_register = async (req, res) => {
  
    const { candidateID, firstName, lastName, email, phoneNumber, address, organizationID } = req.body;
  
    // Check if all required fields are provided
    if (!candidateID || !firstName || !lastName || !email || !phoneNumber || !address || !organizationID) {
      return res.status(400).json({ error: 'Missing or invalid parameters' });
    }
  
    try {
      // Process registration (save to database, etc.)
      // For demonstration, just send back a success message
      await Users.create({ candidateID, firstName, lastName, email, phoneNumber, address, organizationID });
      res.status(201).json({ message: 'Candidate successfully registered' });
    } catch (error) {
      console.error('Error registering candidate:', error);
      res.status(500).json({ error: 'Error registering candidate' });
    }
  }