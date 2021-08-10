const mongoose = require('mongoose');
const validator = require('validator');
const showcaseSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: 'showcase_bg.jpg',
    required: true,
  },

  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   //showing relationship with user model
  //   ref: 'User',
  // },
});
const Showcase = mongoose.model('Showcase', showcaseSchema);
module.exports = Showcase;
