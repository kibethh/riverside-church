const mongoose = require('mongoose');
const validator = require('validator');
const paymentSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Payment = mongoose.model('Offerings', paymentSchema);
module.exports = Payment;
