const mongoose = require('mongoose');
const validator = require('validator');
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //showing relationship with user model
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const News = mongoose.model('News', newsSchema);
module.exports = News;
