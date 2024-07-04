const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    companyId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Company name is required"],
      maxlength: 100,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      maxlength: 50,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      maxlength: 50,
    },
    division: {
      type: String,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

CompanySchema.pre("save", async function (next) {
  console.log("company pre save hook called");
  const chars = "0123456789";
  let companyId = "";
  let isUnique = false;

  while (!isUnique) {
    companyId = "C";
    for (let i = 0; i < 6; i++) {
      companyId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const existingCompany = await Company.findOne({ companyId });
    if (!existingCompany) {
      isUnique = true;
    } else {
      console.log(`Duplicate company ID found: ${companyId}. Generating a new ID.`);
    }
  }
  this.companyId = companyId;
  next();
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
