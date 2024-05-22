const Candidate = require("../models/candidates");

// module.exports.candidates_register = async (req, res) => {
  
//     const { candidateID, firstName, lastName, email, phoneNumber, address, organizationID } = req.body;
  
//     // Check if all required fields are provided
//     if (!candidateID || !firstName || !lastName || !email || !phoneNumber || !address || !organizationID) {
//       return res.status(400).json({ error: 'Missing or invalid parameters' });
//     }
  
//     try {
//       // Process registration (save to database, etc.)
//       // For demonstration, just send back a success message
//       await Users.create({ candidateID, firstName, lastName, email, phoneNumber, address, organizationID });
//       res.status(201).json({ message: 'Candidate successfully registered' });
//     } catch (error) {
//       console.error('Error registering candidate:', error);
//       res.status(500).json({ error: 'Error registering candidate' });
//     }
//   }




  module.exports.candidates_register = async (req, res) => {
    console.log(req.body)
    const { selectedTestType, fullName, phoneNumber, email, selectedLabels, testDateTime } = req.body;

        if (!selectedTestType || !fullName) {
            return res.status(400).json({ error: 'Missing or invalid parameters' });
        }
        try {
        await Candidate.create({selectedTestType, fullName, phoneNumber, email, selectedLabels, testDateTime});
        res.json({ message: 'Candidate successfully registered' });
    } catch (error) {
        console.error('Error registering candidate:', error);
        res.json({ error: 'Error registering candidate' });
    }
};



module.exports.candidates_edit = async (req, res) => {
    console.log(req.body);
    const { candidateID, firstName, lastName, email, phoneNumber, address, organizationID } = req.body;

    try {
        // Check if candidateID is provided
        if (!candidateID) {
            return res.status(400).json({ error: 'Candidate ID is required' });
        }

        // Check if at least one field to update is provided
        if (!firstName && !lastName && !email && !phoneNumber && !address && !organizationID) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        // Process update (update database record, etc.)
        // For demonstration, assuming Candidate model exists with update method
        const candidate = await Candidate.findOneAndUpdate(
            { candidateID: candidateID },
            { $set: { firstName, lastName, email, phoneNumber, address, organizationID } },
            { new: true }
        );

        // Check if candidate exists
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // If candidate is successfully updated
        res.status(200).json({ message: 'Candidate information updated successfully' });
    } catch (error) {
        console.error('Error updating candidate:', error);
        res.status(500).json({ error: 'Error updating candidate' });
    }
};
