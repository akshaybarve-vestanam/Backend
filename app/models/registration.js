const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const registrationSchema = new Schema({
    belongTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String,
    },
    countryCode: {
        type: Number,
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
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    messageCount: {
        type: Number,
        default: 0
    },
    middleName: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    project: {
        type: String,
    },
    status: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: String,
       
    },
}, {
    timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
