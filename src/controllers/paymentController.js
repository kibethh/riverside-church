const stripe = require('stripe');
const prettyjson = require('prettyjson');
const stringify = require('json-stable-stringify');
const axios = require('axios');
const Payment = require('../models/payment');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.dataIntoReqBody = catchAsync(async (req, res, next) => {
  if (!req.body.phone || req.body.amount) {
    return next(
      new AppError('Please provide a phone number and amount!!', 400)
    );
  }
  const phone = req.body.phone;
  const amount = req.body.amount;
  const nextUrl = `/api/v1/payment/mpesa?phone=${phone}&amount=${amount}`;
  res.redirect(302, nextUrl);
});
exports.getOAuthToken = catchAsync(async (req, res, next) => {
  let consumer_key = process.env.MPESA_CONSUMER_KEY;
  let consumer_secret = process.env.MPESA_CONSUMER_SECRET;

  //form a buffer of the consumer key and secret
  let buffer = new Buffer.from(consumer_key + ':' + consumer_secret);

  let auth = `Basic ${buffer.toString('base64')}`;

  let { data } = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: auth,
      },
    }
  );
  // console.log(data);
  // asigning access token to a variable in the next middleware
  req.data = req.query;
  req.token = data['access_token'];
  return next();
});

exports.lipaNaMpesaOnline = catchAsync(async (req, res) => {
  // console.log(req.data, 'data');

  // const phone = req.data.phone;
  const Amount = req.data.amount;
  const PhoneNumber = '254' + req.data.phone.slice(1);

  let token = req.token;
  let auth = `Bearer ${token}`;

  // Creating timestamp
  const today = new Date();
  const date =
    today.getFullYear() +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    ('0' + today.getDate()).slice(-2);
  const time =
    today.getHours().toString() +
    today.getMinutes().toString() +
    today.getSeconds().toString();
  const Timestamp = date + time;

  let buffer = new Buffer.from(
    process.env.BusinessShortCode + process.env.PassKey + Timestamp
  );

  let Password = buffer.toString('base64');

  const payLoad = {
    BusinessShortCode: 174379,
    Password,
    Timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount,
    PartyA: PhoneNumber,
    PartyB: 174379,
    PhoneNumber,
    CallBackURL:
      'https://240e-105-160-64-83.ngrok.io/api/v1/payment/mpesastatus',
    AccountReference: 'test',
    TransactionDesc: 'test',
  };

  let { data } = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    payLoad,
    {
      headers: {
        Authorization: auth,
      },
    }
  );
  res.status(200).json({
    success: true,
    data,
  });
});

exports.paymentStatus = catchAsync(async (req, res, next) => {
  const {
    Body: {
      stkCallback: {
        CallbackMetadata: { Item },
      },
    },
  } = req.body;
  // Object to insert array items
  const newObj = {};
  Item.forEach((ob) => {
    if (ob.Value) newObj[ob.Name] = ob.Value;
  });

  if (CallbackMetadata) {
    await Payment.create({
      amount: newObj.Amount,
      transactionId: newObj.MpesaReceiptNumber,
      transactionDate: newObj.TransactionDate,
      phone: newObj.PhoneNumber,
    });
  }
  console.log('Success');

  res.status(200).json({
    success: true,
    ResultDesc,
  });
});
