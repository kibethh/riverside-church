const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const User = require('../models/user');
const router = new express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.get('/users', authController.protect, userController.allUsers);

// authController.restrictTo("admin","lead-guide"),
router.delete(
  '/users/:id',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  userController.deleteUser
);

module.exports = router;
