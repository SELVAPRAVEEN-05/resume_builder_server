const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema(
  {
    degreeName: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Degree', degreeSchema);
