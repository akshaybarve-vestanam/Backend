const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const CandidateSchema = new Schema(
  {
    candidateId: {
      type: String,
      unique: true,
    },
    selectedTestType: {
      type: Array,
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "First name is missing"],
      maxlength: 100,
    },
    phoneNumber: {
      type: String,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      required: true,
    },
    selectedLabels: {
      type: Array,
    },
    testDateTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

CandidateSchema.pre("save", async function (next) {
  console.log("candidate pre save hook called")
    const chars = "0123456789";
    let candidateid = "";
    let isUnique = false;

    while (!isUnique) {
      candidateid = "S";
      for (let i = 0; i < 6; i++) {
        candidateid += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const existingCandidate = await Candidate.findOne({ candidateid });
      if (!existingCandidate) {
        isUnique = true;
      }
      else {
        console.log(`Duplicate candidate ID found: ${candidateid}. Generating a new ID.`);
      }
    }
    console.log("candidateid");
    this.candidateId = candidateid;
    next();
});
const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
