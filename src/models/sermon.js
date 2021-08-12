const mongoose = require('mongoose');
const validator = require('validator');
const sermonSchema = new mongoose.Schema(
  {
    speaker: {
      type: String,
      required: true,
      lowercase: true,
    },
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    bible_verse: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
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
const Sermon = mongoose.model('Sermon', sermonSchema);
module.exports = Sermon;
