const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    fullName: { type: String },
    role: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String , required: false },
    linkedin: { type: String },
    github: { type: String },
    dateOfBirth: { type: Date },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
