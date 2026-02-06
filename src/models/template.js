const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    filePath: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    previewUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Template', templateSchema);
