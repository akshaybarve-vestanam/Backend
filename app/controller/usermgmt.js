const User = require("../models/usermgmt");
const Company = require("../models/company");

module.exports.user_register = async (req, res) => {
  const { fullName, email, mobileNumber, companies } = req.body;
  console.log(req.body);

  if (!fullName || !email || !mobileNumber) {
    return res.status(400).json({ s: false, m: "Missing or invalid parameters" });
  }

  try {
    const userCompanies = [];

    // Fetch the company objects based on the provided company IDs
    for (const companyId of companies) {
      const company = await Company.findOne({ companyId });
      if (!company) {
        return res.status(404).json({ s: false, m: `Company with ID ${companyId} not found` });
      }
      userCompanies.push(company._id);
    }

    let user = new User({
      fullName,
      email,
      mobileNumber,
      companies: userCompanies
    });

    user = await user.save();
    console.log("==========", user);
    res.json({ s: true, m: "User successfully registered" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ s: false, m: "Error registering user" });
  }
};
