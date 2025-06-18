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
  age: {
    type: Number,
    required: true
  },
  address: {
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    house: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    fullAddress: { type: String, required: true }
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
