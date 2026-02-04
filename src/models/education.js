const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true
    },
    grade: Number,
    graduationYear: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
