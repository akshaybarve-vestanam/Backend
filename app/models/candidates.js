const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };
 
const CandidateSchema = new Schema({
  candidateID: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: [true,"First name is missing"],
    maxlength: 100
  },
  lastName: {
    type: String,
    required: [true,"Last name is missing"],
    maxlength: 100
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phoneNumber: {
    type: String,
    maxlength: 20,
    required: [true,"Phone number is missing"]
  },
  address: {
    type: String
  },
  organizationID: {
    type: Number,
    required: true,
    ref: 'Organisation'
  }
}, {
  timestamps: true
});
 
const Candidate = mongoose.model('Candidate', CandidateSchema);
 
module.exports = Candidate;