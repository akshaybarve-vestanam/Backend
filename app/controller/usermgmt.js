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
