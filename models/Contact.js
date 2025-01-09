const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  
  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
