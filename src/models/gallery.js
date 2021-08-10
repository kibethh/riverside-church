const mongoose = require('mongoose');
const validator = require('validator');
const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    department: {
      type: 'string',
      required: true,
    },

    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   //showing relationship with user model
    //   ref: 'User',
    // },
  },
  { timestamps: true }
);
const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;
