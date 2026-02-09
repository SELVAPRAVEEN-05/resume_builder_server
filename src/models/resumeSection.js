const mongoose = require('mongoose');

const resumeSectionSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    sectionKey: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    orderIndex: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeSection', resumeSectionSchema);
