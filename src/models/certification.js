const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    name: String,
    grade: Number,
    date: String,
    link: String,
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
