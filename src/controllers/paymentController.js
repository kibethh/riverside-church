const stripe = require('stripe');
const prettyjson = require('prettyjson');
const stringify = require('json-stable-stringify');
const axios = require('axios');
const fetch = require('node-fetch');
const Payment = require('../models/payment');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.dataIntoReqBody = catchAsync(async (req, res, next) => {
  if (!req.body.phone || !req.body.amount) {
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
  const parsedBuffer = buffer.toString('base64');

  let auth = `Basic ${parsedBuffer.trim()}`;

  const { data } = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      },
    }
  );
  console.log(data);
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

  const hours =
    today.getHours().toString().length == 2
      ? today.getHours().toString()
      : 0 + today.getHours().toString();
  const minutes =
    today.getMinutes().toString().length == 2
      ? today.getMinutes().toString()
      : 0 + today.getMinutes().toString();
  const seconds =
    today.getSeconds().toString().length == 2
      ? today.getSeconds().toString()
      : 0 + today.getSeconds().toString();

  const time = hours + minutes + seconds;

  const Timestamp = date + time;

  const BusinessShortCode = parseInt(process.env.BusinessShortCode);
  let buffer = new Buffer.from(
    BusinessShortCode + process.env.PassKey.trim() + Timestamp.trim()
  );

  let Password = buffer.toString('base64').split('=')[0];
  // let Password =
  //   'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIxMDI1MTYwOTE3';

  console.log('pass', Password.toString());

  const TransactionType = process.env.TransactionType.trim();
  const AccountReference = process.env.AccountReference.trim();
  const TransactionDesc = process.env.TransactionDesc.trim();
  const PartyA = parseInt(process.env.MPESA_PARTY_A);
  const PartyB = parseInt(process.env.MPESA_PARTY_B);
  const CallBackURL = process.env.CallBackURL.trim();

  const payLoad = {
    BusinessShortCode,
    Password,
    Timestamp,
    TransactionType,
    Amount,
    PartyA,
    PartyB,
    PhoneNumber,
    CallBackURL,
    AccountReference,
    TransactionDesc,
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
      stkCallback: { CallbackMetadata },
    },
  } = req.body;

  if (CallbackMetadata) {
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

    await Payment.create({
      amount: newObj.Amount,
      transactionId: newObj.MpesaReceiptNumber,
      transactionDate: newObj.TransactionDate,
      phone: newObj.PhoneNumber,
    });
  }

  res.status(200).json({
    success: true,
    //   ResultDesc,
  });
});
