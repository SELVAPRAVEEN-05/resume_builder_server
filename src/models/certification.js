const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    name: { type: String },
    grade: { type: Number },
    date: { type: Date },
    link: { type: String },
    description: { type: String },
    orderIndex: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
