const express = require('express');
const authController = require('../controllers/authController');
const showcaseController = require('../controllers/showcaseController');

const router = new express.Router();

router.post(
  '/',
  showcaseController.uploadShowcasePhoto,
  showcaseController.resizeShowcasePhoto,
  showcaseController.createShowcase
);
module.exports = router;
