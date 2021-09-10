const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');
const viewsController = require('../controllers/viewsController');

const router = new express.Router();

router.post(
  '/userdata',
  // authController.protect,
  paymentController.dataIntoReqBody
);
router.get(
  '/mpesa',
  // authController.protect,
  paymentController.getOAuthToken,
  paymentController.lipaNaMpesaOnline
);
router.post(
  '/mpesastatus',
  paymentController.paymentStatus
  // authController.protect,
);
// router.get('/status');

module.exports = router;
