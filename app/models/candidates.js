const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };
 
const CandidateSchema = new Schema({
  selectedTestType: {
    type: Array,
    required: true
  },
  fullName: {
    type: String,
    required: [true,"First name is missing"],
    maxlength: 100
  },
  phoneNumber: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: true
  },
  selectedLabels: {
    type: Array
  },
  testDateTime: {
    type: Date,
  }
}, {
  timestamps: true
});
 
const Candidate = mongoose.model('Candidate', CandidateSchema);
 
module.exports = Candidate;