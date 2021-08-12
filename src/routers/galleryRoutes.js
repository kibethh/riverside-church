const express = require('express');
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

const router = new express.Router();

router.post(
  '/',
  authController.protect,
  galleryController.uploadGalleryPhoto,
  galleryController.resizeGalleryPhoto,
  galleryController.createGallery
);

module.exports = router;
