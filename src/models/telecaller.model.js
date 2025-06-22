const mongoose = require('mongoose');

const telecallerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  profilePhoto: {
    type: String
  },
  cv: {
    type: String 
  },
  experienceCertificate: {
    type: String 
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
  workType: {
  type: String,
  enum: ['Work From Home', 'Work From Office', 'Hybrid'],
  required: true
},
}, { timestamps: true });

module.exports = mongoose.model('Telecaller', telecallerSchema);
