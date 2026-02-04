const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },
    jobTitle: String,
    startDate: String,
    endDate: String,
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
