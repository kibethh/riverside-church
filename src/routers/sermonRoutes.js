const express = require('express');
const authController = require('../controllers/authController');
const sermonController = require('../controllers/sermonController');

const router = new express.Router();

router.post('/', authController.protect, sermonController.createSermon);
// router.post('/', sermonController.createSermon);

router.get('/', sermonController.getSermons);
// router.get('/:id', authController.protect, sermonController.searchSermon);
router.get('/:id', sermonController.searchSermon);
router.patch('/:id', authController.protect, sermonController.updateSermon);
router.delete('/:id', authController.protect, sermonController.removeSermon);
module.exports = router;
