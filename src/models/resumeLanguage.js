const mongoose = require('mongoose');

const resumeLanguageSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
    },
    orderIndex: { type: Number, default: 4 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeLanguage', resumeLanguageSchema);
