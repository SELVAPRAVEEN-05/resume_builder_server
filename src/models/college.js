const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true
    },
    degree: String,
    specialization: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
