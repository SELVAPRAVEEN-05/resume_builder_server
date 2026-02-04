const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    fullName: String,
    address: String,
    email: String,
    phone: String,
    website: String,
    linkedin: String,
    github: String,
    dateOfBirth: String,
    imageUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
