const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };
 
const OrganisationSchema = new Schema({
  organisationID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is missing'],
    maxlength: 255
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: [true, 'Address is missing']
  },
  contactPerson: {
    type: String,
    maxlength: 100
  },
  contactEmail: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  contactPhone: {
    type: String,
    maxlength: 20,
    required: [true, "Phone number is missing"]
  }
}, {
  timestamps: true
});
 
const Organisation = mongoose.model('Organisation', OrganisationSchema);
 
module.exports = Organisation;
 