const mongoose = require('mongoose');

const resumeSkillSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    },
    orderIndex: { type: Number, default: 3 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeSkill', resumeSkillSchema);
