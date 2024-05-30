const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LabelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Label is missing"],
    maxlength: 100
  },
  company: {
    type: String
  }
}, {
  timestamps: true
});

const Label = mongoose.model('Label', LabelSchema);

module.exports = Label;