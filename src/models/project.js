const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    title: String,
    description: String,
    techStack: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
