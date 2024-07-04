const Company = require("../models/company");

module.exports.companies_register = async (req, res) => {
  const { name, city, country, division } = req.body;
  console.log(req.body);

  if (!name || !city || !country) {
    return res
      .status(400)
      .json({ s: false, m: "Missing or invalid parameters" });
  }

  try {
    let company = new Company({
      name,
      city,
      country,
      division,
    });
    company = await company.save();
    console.log("==========", company);
    res.json({ s: true, m: "Company successfully registered" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.json({ s: false, m: "Error registering company" });
  }
};
