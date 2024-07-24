const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


const Users = new Schema({
  name: {
    type: String,
    required: [true, 'Name Is Missing']
  },
  // username:{
  //     type:String,
  //     trim:true
  // },
  phoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: [true, 'Mobile Number Is Missing']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique : true
  },
  address: {
    type: String,
    required: [true, 'Address is missing']
  },
  query: {
    type: String,
    required: [true, 'Query is missing']
  },
  docs: [{
    type: String
  }],
  otp: {
    valid: Boolean,
    val: String,
    createdAt: Date
  }
}, {
    timestamps: true
  });


module.exports = mongoose.model('Usersignup', Users);
