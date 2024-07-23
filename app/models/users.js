const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    userId: {
        type: String,
        unique: true,
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
    
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;

