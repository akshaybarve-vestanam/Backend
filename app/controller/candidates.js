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
  const {
    selectedTestType,
    fullName,
    phoneNumber,
    email,
    selectedLabels,
    testDateTime,
  } = req.body;
  console.log(req.body);
  if (!selectedTestType || !fullName) {
    return res
      .status(400)
      .json({ s: false, m: "Missing or invalid parameters" });
  }
  try {
    let c = new Candidate({
      selectedTestType,
      fullName,
      phoneNumber,
      email,
      selectedLabels,
      testDateTime,
    });
    c = await c.save();
    console.log("==========", c);
    res.json({ s: true, m: "Candidate successfully registered" });
  } catch (error) {
    console.error("Error registering candidate:", error);
    res.json({ s: false, m: "Error registering candidate" });
  }
};


module.exports.load_candidates = async (req, res) => {
  console.log(query);
  try {
    const { name, email, phoneNumber, startDate, endDate } = req.query;

    const query = {};

    if (name) {
      query.fullName = new RegExp(name, 'i'); 
    }

    if (email) {
      query.email = new RegExp(email, 'i'); 
    }

    if (phoneNumber) {
      query.phoneNumber = new RegExp(phoneNumber);
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ s: false, m: "Error fetching candidates" });
  }
};

module.exports.candidates_edit = async (req, res) => {
  console.log(req.body);
  const { name, emailId, phoneNumber, candidateId } = req.body;

  try {
    if (!name && !emailId && !phoneNumber && !candidateId) {
      return res.status(400).json({ s: false, m: "No fields to update" });
    }
    const updateFields = {};
    if (name) updateFields.fullName = name;
    if (emailId) updateFields.email = emailId;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ s: false, m: "No fields to update" });
    }

    const candidate = await Candidate.findOneAndUpdate(
      { candidateId: candidateId },
      { $set: { fullName: name, email: emailId, phoneNumber: phoneNumber } },
      { new: false }
    );

    // Check if candidate exists
    if (!candidate) {
      return res.status(400).json({ s: false, m: "Candidate not found" });
    }

    // If candidate is successfully updated
    res
      .status(200)
      .json({ s: true, m: "Candidate information updated successfully" });
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ s: false, m: "Error updating candidate" });
  }
};
