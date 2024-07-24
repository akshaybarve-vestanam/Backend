





// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

// let validateEmail = (email) => {
//   if (!email || email === '') return true; // Allow empty emails
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

// const CandidateSchema = new Schema(
//   {
//     candidateId: {
//       type: String,
//       unique: true,
//     },
//     selectedTestType: {
//       type: String,
//       required: true,
//     },
//     fullName: {
//       type: String,
//       required: [true, "First name is missing"],
//       maxlength: 100,
//     },
//     phoneNumber: {
//       type: String,
//       maxlength: 20,
//     },
//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: validateEmail,
//         message: "Please fill a valid email address",
//       },
//     },
//     selectedLabels: {
//       type: Array,
//     },
//     testDateTime: {
//       type: Date,
//     },

//     firstName: {
//       type: String,
//     },
//     middleName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//     },
//     status: {
//       type: String,
//     },
//     category: {
//       type: String,
//     },
//     messageCount: {
//       type: Number,
//     },
//     name: {
//       type: String,
//     },
//     countryCode: {
//       type: Number,
//     },
//     project: {
//       type: Schema.Types.Mixed,
//     },
//     belongTo: {
//       type: ObjectId,
//       ref: "Registrations",
//     },
//     user: {
//       type: ObjectId,
//       ref: "Registrations",
//     },

//     education: {
//       type: Array,
//     },
//     examId: [{
//       type: ObjectId,
//       ref: "Users",
//     }],
//     fName: {
//       type: String,
//     },
//     mName: {
//       type: String,
//     },
//     lName: {
//       type: String,
//     },
//     gender: {
//       type: String,
//     },
//     dob: {
//       type: Date,
//     },
//     curriculum: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     pincode: {
//       type: String,
//     },
//     state: {
//       type: String,
//     },
//     mobileNo: {
//       type: Number,
//     },
//     belongTo: {
//       type: ObjectId,
//       ref: "Users",
//     },
//     examName: {
//       type: ObjectId,
//       ref: "Users",
//     },
//     reg: {
//       type: ObjectId,
//       ref: "Users",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// CandidateSchema.pre("save", async function (next) {
//   console.log("candidate pre save hook called");
//   const chars = "0123456789";
//   let candidateid = "";
//   let isUnique = false;

//   while (!isUnique) {
//     candidateid = "S";
//     for (let i = 0; i < 6; i++) {
//       candidateid += chars.charAt(Math.floor(Math.random() * chars.length));
//     }

//     const existingCandidate = await Candidate.findOne({ candidateid });
//     if (!existingCandidate) {
//       isUnique = true;
//     } else {
//       console.log(`Duplicate candidate ID found: ${candidateid}. Generating a new ID.`);
//     }
//   }
//   console.log("candidateid");
//   this.candidateId = candidateid;
//   next();
// });

// const Candidate = mongoose.model("Candidate", CandidateSchema);

// module.exports = Candidate;



const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let validateEmail = (email) => {
  if (!email) return true; // Allow empty or undefined emails
  if (email === 'unknown') return true; // Explicitly allow 'unknown' value
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
      //required: true,
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
      default: 0
    },
    name: {
      type: String,
    },
    countryCode: {
      type: Number,
    },
    project: {
      type: String,
    },
    belongTo: {
      type: ObjectId,
      ref: "User",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    education: {
      type: [String],
    },
    examId: {
      type: [String],
    },
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
      type: Schema.Types.Mixed,
    },
    belongTo: {
      type: ObjectId,
      ref: "Registration",
    },
    examName: {
      type: ObjectId,
      ref: "Registration",
    },
    reg: {
      type: ObjectId,
      ref: "Registration",
    },
    project: {
      type: String,
    },
    address: {
      type: String,
    },
    mol: {
      type: String
    },
    mt: {
      type: String
    },
    wiwtob: {
      type: String
    },
    userId: {
      type: String,
      unique: true,
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







// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

// // Email validation function
// const validateEmail = (email) => {
//   if (!email) return true; // Allow empty or undefined emails
//   if (email === 'unknown') return true; // Explicitly allow 'unknown' value
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

// // Define Candidate Schema
// const CandidateSchema = new Schema(
//   {
//     candidateId: {
//       type: String,
//       unique: true,
//       required: true // Ensure candidateId is required
//     },
//     selectedTestType: {
//       type: String,
//       // required: true,
//     },
//     fullName: {
//       type: String,
//       required: [true, "Full name is required"], // Adjusted validation message
//       maxlength: 100,
//     },
//     phoneNumber: {
//       type: String,
//       maxlength: 20,
//     },
//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: validateEmail,
//         message: "Please fill a valid email address",
//       },
//     },
//     selectedLabels: {
//       type: [String], // Use array of strings if labels are strings
//     },
//     testDateTime: {
//       type: Date,
//     },
//     firstName: {
//       type: String,
//     },
//     middleName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//     },
//     status: {
//       type: String,
//     },
//     category: {
//       type: String,
//     },
//     messageCount: {
//       type: Number,
//       default: 0
//     },
//     name: {
//       type: String,
//     },
//     countryCode: {
//       type: Number,
//     },
//     project: {
//       type: String,
//     },
//     belongTo: {
//       type: ObjectId,
//       ref: "User",
//     },
//     user: {
//       type: ObjectId,
//       ref: "User",
//     },
//     education: {
//       type: [String],
//     },
//     examId: {
//       type: [String],
//     },
//     gender: {
//       type: String,
//     },
//     dob: {
//       type: Date,
//     },
//     curriculum: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     pincode: {
//       type: String,
//     },
//     state: {
//       type: String,
//     },
//     mobileNo: {
//       type: Schema.Types.Mixed,
//     },
//     address: {
//       type: String,
//     },
//     mol: {
//       type: String
//     },
//     mt: {
//       type: String
//     },
//     wiwtob: {
//       type: String
//     },
//     userId: {
//       type: String,
//       unique: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Pre-save hook to generate unique candidateId
// CandidateSchema.pre("save", async function (next) {
//   console.log("candidate pre-save hook called");
//   const chars = "0123456789";
//   let candidateId = "";
//   let isUnique = false;

//   while (!isUnique) {
//     candidateId = "S";
//     for (let i = 0; i < 6; i++) {
//       candidateId += chars.charAt(Math.floor(Math.random() * chars.length));
//     }

//     // Check if candidateId already exists
//     const existingCandidate = await Candidate.findOne({ candidateId });
//     if (!existingCandidate) {
//       isUnique = true;
//     } else {
//       console.log(`Duplicate candidate ID found: ${candidateId}. Generating a new ID.`);
//     }
//   }

//   console.log("Generated candidateId:", candidateId);
//   this.candidateId = candidateId;
//   next();
// });

// // Create and export the model
// const Candidate = mongoose.model("Candidate", CandidateSchema);
// module.exports = Candidate;
