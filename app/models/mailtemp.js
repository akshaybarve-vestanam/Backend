const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MailTemplateSchema = new Schema({
  templateID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true,"Template name is missing"],
    maxlength: 100
  },
  subject: {
    type: String,
    required: [true,"Mail subject is missing"],
    maxlength: 255
  },
  body: {
    type: String,
    required: [true,"Body of the mail is missing"]
  }
}, {
  timestamps: true
});
 
 
const MailTemplate = mongoose.model('MailTemplate', MailTemplateSchema);
 
module.exports = MailTemplate;