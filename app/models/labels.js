const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LabelSchema = new Schema({
  labelName: {
    type: String,
    required: [true,"Label is missing"],
    maxlength: 100
  }
}, {
  timestamps: true
});
 
const Label = mongoose.model('Label', LabelSchema);
 
module.exports = Label;