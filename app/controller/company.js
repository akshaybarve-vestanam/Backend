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


// module.exports.load_companies = async (req, res) => {
//     try {
//       const companies = await Company.find({});
//       res.json({ s: true, d: companies });
//     } catch (error) {
//       console.error("Error loading companies:", error);
//       res.json({ s: false, m: "Error loading companies" });
//     }
//   };


module.exports.load_companies = async (req, res) => {
    try {
      let query = {};
  
      if (req.query.search) {
        query = {
          $or: [
            { name: { $regex: new RegExp(req.query.search, 'i') } },
            { city: { $regex: new RegExp(req.query.search, 'i') } },
            { country: { $regex: new RegExp(req.query.search, 'i') } }
          ]
        };
      }
  
      const companies = await Company.find(query);
      res.json({ s: true, d: companies, m: "Companies List", count: companies.length });
    } catch (error) {
      console.error("Error loading companies:", error);
      res.status(500).json({ s: false, m: "Error loading companies" });
    }
  };
  