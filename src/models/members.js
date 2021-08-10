const mongoose = require('mongoose');
const validator = require('validator');
const membersSchema = new mongoose.Schema({
  member_name: {
    type: String,
    trim: true,
    required: true,
  },
  photo: {
    type: String,
    default: 'default.jpeg',
    required: true,
  },
  member_opinion: {
    type: String,
    required: true,
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   //showing relationship with user model
  //   ref: 'User',
  // },
});
const Members = mongoose.model('Members', membersSchema);
module.exports = Members;
