const Candidate = require("../models/candidates");
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
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


// module.exports.load_candidates = async (req, res) => {
//   //console.log(query);
//   try {
//     const { name, email, phoneNumber, startDate, endDate } = req.query;

//     const query = {};

//     if (name) {
//       query.fullName = new RegExp(name, 'i'); 
//     }

//     if (email) {
//       query.email = new RegExp(email, 'i'); 
//     }

//     if (phoneNumber) {
//       query.phoneNumber = new RegExp(phoneNumber);
//     }

//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }

//     const candidates = await Candidate.find(query);
//     res.json(candidates);
//   } catch (error) {
//     console.error("Error fetching candidates:", error);
//     res.status(500).json({ s: false, m: "Error fetching candidates" });
//   }
// };
// module.exports.load_candidates = async (req, res) => {
//   try {
//     const { name, email, phoneNumber, startDate, endDate } = req.query;

//     const query = {};

//     if (name) {
//       query.fullName = new RegExp(String(name), 'i'); 
//     }

//     if (email) {
//       query.email = new RegExp(String(email), 'i'); 
//     }

//     if (phoneNumber) {
//       query.phoneNumber = new RegExp(String(phoneNumber));
//     }

//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) {
//         query.createdAt.$gte = new Date(startDate);
//       }
//       if (endDate) {
//         query.createdAt.$lte = new Date(endDate);
//       }
//     }

//     const candidates = await Candidate.find(query);
//     res.json(candidates);
//   } catch (error) {
//     console.error("Error fetching candidates:", error);
//     res.status(500).json({ s: false, m: "Error fetching candidates" });
//   }
// };



module.exports.load_candidates = async (req, res) => {
  try {

    let query = {}

    let order = {
      name: "fullName",
      email: "email"
    }

    console.log(req.query)
    if (req.query.search) {
      query = {
        $or: [
          { fullName: { $regex: new RegExp(req.query.search, 'i') } },
          { candidateId: { $regex: new RegExp(req.query.search, 'i') } },
          { email: { $regex: new RegExp(req.query.search, 'i') } },
          { phoneNumber: { $regex: new RegExp(req.query.search, 'i') } }
        ]
      }
    }

    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {}
      query.createdAt.$gte = new Date(req.query.startDate);
      query.createdAt.$lte = new Date(req.query.endDate);
    }
    if (req.query.labels) {
      query.selectedLabels = { $in: req.query.labels.split(',') };
    }

    const count = await Candidate.find(query).select({ _id: 1 }).lean();
    const candidates = await Candidate.find(query).sort({ [order[req.query.order] ? order[req.query.order] : 'createdAt']: req.query.dir ? req.query.dir : 'desc' }).skip(req.query.offset).limit(req.query.limit);

    res.json({ s: true, d: candidates, m: "Candidates List", count: count.length });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ s: false, m: "Error fetching candidates" });
  }
};


module.exports.candidates_edit = async (req, res) => {
  console.log('Request body:', req.body); // Log the entire request body
  const { fullName, email, phoneNumber, candidateId, selectedTestType, selectedLabels } = req.body;

  try {
    if (!fullName && !email && !phoneNumber && !candidateId && !selectedTestType && !selectedLabels) {
      return res.status(400).json({ s: false, m: "No fields to update" });
    }

    const updateFields = {};
    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (selectedTestType) updateFields.selectedTestType = selectedTestType;
    if (selectedLabels) updateFields.selectedLabels = selectedLabels;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ s: false, m: "No fields to update" });
    }

    console.log('Update Fields:', updateFields); // Log the fields to be updated

    const candidate = await Candidate.findOneAndUpdate(
      { candidateId: candidateId },
      { $set: updateFields },
      { new: true }
    );
    console.log(candidate)

    // Check if candidate exists
    if (!candidate) {
      return res.status(400).json({ s: false, m: "Candidate not found" });
    }

    // If candidate is successfully updated
    res.status(200).json({ s: true, m: "Candidate information updated successfully", candidate });
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ s: false, m: "Error updating candidate" });
  }
};


module.exports.download_candidate_data = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const candidate = await Candidate.findOne({ candidateId });

    if (!candidate) {
      return res.status(404).json({ s: false, m: 'Candidate not found' });
    }

    const outputFilePath = path.join(__dirname, `${candidateId}.zip`);
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    output.on('close', () => {
      res.download(outputFilePath, `${candidateId}.zip`, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
        }
        fs.unlinkSync(outputFilePath); // Delete the file after download
      });
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Append candidate data as JSON
    archive.append(JSON.stringify(candidate, null, 2), { name: 'candidate.json' });

    archive.finalize();
  } catch (error) {
    console.error('Error downloading candidate data:', error);
    res.status(500).json({ s: false, m: 'Error downloading candidate data' });
  }
};

module.exports.updateCandidate = async (req, res) => {
  const candidateId = req.params.candidateId;
  const updatedData = req.body;

  try {
    const candidate = await Candidate.findOneAndUpdate({ candidateId }, updatedData, { new: true });

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({ success: true, message: 'Candidate updated successfully', candidate });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ success: false, message: 'Error updating candidate' });
  }
};