const express = require('express');
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

const router = new express.Router();

router.post(
  '/',
  galleryController.uploadGalleryPhoto,
  galleryController.resizeGalleryPhoto,
  // authController.authMember,
  galleryController.createGallery
);

module.exports = router;
