const mongoose = require('mongoose');
const validator = require('validator');
const eventsSchema = new mongoose.Schema({
  event_title: {
    type: String,
    trim: true,
    required: true,
  },
  event_date: {
    type: String,
    required: true,
  },
  description: {
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
const Events = mongoose.model('Events', eventsSchema);
module.exports = Events;
