const express = require('express');
const authController = require('../controllers/authController');
const membersController = require('../controllers/membersController');

const router = new express.Router();

router.post(
  '/',
  authController.protect,
  membersController.uploadMemberPhoto,
  membersController.resizeMemberPhoto,
  authController.authMember,
  membersController.createMembers
);
router.get('/', membersController.getmembers);
router.get('/:id', authController.protect, membersController.searchmembers);
router.patch('/:id', authController.protect, membersController.updatemembers);
router.delete('/:id', authController.protect, membersController.removemembers);
module.exports = router;
