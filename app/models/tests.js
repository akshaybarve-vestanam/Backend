
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const TestTypeSchema = new Schema({
  ID: {
    type: Number,
    required: [true,"Enter the Test ID"],
    unique: true
  },
  name: {
    type: String,
    required: [true,"Test name is missing"],
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
 
 
const TestType = mongoose.model('TestType', TestTypeSchema);
 
module.exports = TestType;