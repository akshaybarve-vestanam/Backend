





const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
 
let validateEmail = (email) => {
  if (!email || email === '') return true; // Allow empty emails
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
      type: String,
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
      validate: {
        validator: validateEmail,
        message: "Please fill a valid email address",
      },
    },
    selectedLabels: {
      type: Array,
    },
    testDateTime: {
      type: Date,
    },

    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    status: {
      type: String,
    },
    category: {
      type: String,
    },
    messageCount: {
      type: Number,
    },
    name: {
      type: String,
    },
    countryCode: {
      type: Number,
    },
    project: {
      type: Schema.Types.Mixed,
    },
    belongTo: {
      type: ObjectId,
      ref: "Registrations",
    },
    user: {
      type: ObjectId,
      ref: "Registrations",
    },
  
    education: {
      type: Array,
    },
    examId: [{
      type: ObjectId,
      ref: "Users",
    }],
    fName: {
      type: String,
    },
    mName: {
      type: String,
    },
    lName: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    curriculum: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    state: {
      type: String,
    },
    mobileNo: {
      type: Number,
    },
    belongTo: {
      type: ObjectId,
      ref: "Users",
    },
    examName: {
      type: ObjectId,
      ref: "Users",
    },
    reg: {
      type: ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
 
CandidateSchema.pre("save", async function (next) {
  console.log("candidate pre save hook called");
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
    } else {
      console.log(`Duplicate candidate ID found: ${candidateid}. Generating a new ID.`);
    }
  }
  console.log("candidateid");
  this.candidateId = candidateid;
  next();
});
 
const Candidate = mongoose.model("Candidate", CandidateSchema);
 
module.exports = Candidate;