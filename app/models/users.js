const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let validateEmail = (email) => {
    if (!email) return true; // Allow empty or undefined emails
    if (email === 'unknown') return true; // Explicitly allow 'unknown' value
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const userSchema = new Schema({
    belongTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration',
    },
    category: {
        type: String,
    },
    curriculum: {
        type: String,
    },
    dob: {
        type: Date,
    },
    education: {
        type: [String],
    },
    examId: {
        type: [String],
    },
    examName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration',
    },
    fName: {
        type: String,
    },
    mName: {
        type: String,
      },
    gender: {
        type: String,
    },
    lName: {
        type: String,
    },
    reg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration',
    },
    project: {
        type: String,
    },
    
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    address:{
        type:String
    },
    mol:{
        type:String
    },
    mt:{
        type:String
    },
    wiwtob:{
        type:String
    },
    userId: {
        type: String,
        
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
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;

