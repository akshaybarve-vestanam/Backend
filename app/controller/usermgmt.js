const User = require("../models/usermgmt");


module.exports.register_user = async (req, res) => {
  const { fullName, email, mobileNumber, companies } = req.body;
  console.log(req.body);

  if (!fullName || !email || !mobileNumber) {
    return res
      .status(400)
      .json({ s: false, m: "Missing or invalid parameters" });
  }

  try {
    let user = new User({
      fullName,
      email,
      mobileNumber,
      companies,
    });
    user = await user.save();
    console.log("==========", user);
    res.json({ s: true, m: "User successfully registered" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ s: false, m: "Error registering user" });
  }
};


module.exports.load_users = async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query = {
        $or: [
          { fullName: { $regex: new RegExp(req.query.search, 'i') } },
          { email: { $regex: new RegExp(req.query.search, 'i') } },
          { mobileNumber: { $regex: new RegExp(req.query.search, 'i') } }
        ]
      };
    }

     // Pagination parameters
     const offset = parseInt(req.query.offset) || 0; // default to 0 if not provided
     const limit = parseInt(req.query.limit) || 10; // default to 10 if not provided
 
     // Get total count of users matching the query
     const count = await User.countDocuments(query);
 
     // Fetch users with pagination
     const users = await User.find(query)
                             .populate('companies')
                             .skip(offset)
                             .limit(limit);
    res.json({ s: true, d: users, m: "Users List", count: count });
  } catch (error) {
    console.error("Error loading users:", error);
    res.status(500).json({ s: false, m: "Error loading users" });
  }
};