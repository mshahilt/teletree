const mongoose = require('mongoose');

const telecallerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
 
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String // Store the file path or URL
  },
  district: {
    type: String,
    required: true
  },
  
  pincode: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
 
  languages: {
    type: String,
    required: true
  },
 
  jobCategory: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Telecaller', telecallerSchema);
