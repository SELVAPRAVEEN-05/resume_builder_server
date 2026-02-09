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
    jobTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    orderIndex: { type: Number, default: 4 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
