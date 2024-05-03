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
  username:{
      type:String,
      required: [true, "Username is missing"],
      unique:true,
      trim:true
  },
  contact: {
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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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


module.exports = mongoose.model('Users', Users);
