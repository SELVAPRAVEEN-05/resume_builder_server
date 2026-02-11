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
    },
    degreeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Degree',
    },
    specializationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialization',
    },
    grade: { type: Number },
    graduationYear: { type: Number },
    orderIndex: { type: Number, default: 2 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
