const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReportSchema = new Schema({
  name: {
    type: String,
    required: [true,"Report name is missing"],
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  generatedDate: {
    type: Date,
    required: true
  },
  format: {
    type: String,
    required: true,
    enum: ['PDF', 'CSV']
  },
  organizationID: {
    type: Number,
    required: true,
    ref: 'Organisation'
  }
}, {
  timestamps: true
});
const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
 