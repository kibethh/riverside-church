const mongoose = require('mongoose');
const validator = require('validator');
const newsSchema = new mongoose.Schema({
  news_title: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
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
const News = mongoose.model('News', newsSchema);
module.exports = News;
