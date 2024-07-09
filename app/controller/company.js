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


// module.exports.load_companies = async (req, res) => {
//   try {
//       let query = {};

//       if (req.query.search) {
//           query = {
//               $or: [
//                   { name: { $regex: new RegExp(req.query.search, 'i') } },
//                   { city: { $regex: new RegExp(req.query.search, 'i') } },
//                   { country: { $regex: new RegExp(req.query.search, 'i') } }
//               ]
//           };
//       }

//       // Pagination parameters
//       const offset = parseInt(req.query.offset) || 0; // default to 0 if not provided
//       const limit = parseInt(req.query.limit) || 10; // default to 10 if not provided

//       // Get total count of companies matching the query
//       const count = await Company.countDocuments(query);

//       // Fetch companies with pagination
//       const companies = await Company.find(query).skip(offset).limit(limit);


      
      
                                    

//       res.json({ s: true, d: companies, m: "Companies List", count: count });
//   } catch (error) {
//       console.error("Error loading companies:", error);
//       res.status(500).json({ s: false, m: "Error loading companies" });
//   }
// };




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

      // Check for pagination parameters
      const offset = parseInt(req.query.offset);
      const limit = parseInt(req.query.limit);

      // Get total count of companies matching the query
      const count = await Company.countDocuments(query);

      let companies;
      if (!isNaN(offset) && !isNaN(limit)) {
          // Fetch companies with pagination if offset and limit are provided
          companies = await Company.find(query).skip(offset).limit(limit);
      } else {
          // Fetch all companies if no pagination parameters are provided
          companies = await Company.find(query);
      }

      res.json({ s: true, d: companies, m: "Companies List", count: count });
  } catch (error) {
      console.error("Error loading companies:", error);
      res.status(500).json({ s: false, m: "Error loading companies" });
  }
};
