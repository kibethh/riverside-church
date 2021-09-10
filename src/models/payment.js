const mongoose = require('mongoose');
const validator = require('validator');
const paymentSchema = new mongoose.Schema({
  details: {
    type: Array,
    required: true,
  },
});
const Payment = mongoose.model('Offerings', paymentSchema);
module.exports = Payment;
