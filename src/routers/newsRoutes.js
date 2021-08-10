const express = require('express');
const authController = require('../controllers/authController');
const newsController = require('../controllers/newsController');

const router = new express.Router();

// router.post('/', authController.protect, newsController.createnews);
router.post('/', newsController.createNews);
router.get('/', newsController.getnews);
router.get('/:id', authController.protect, newsController.searchnews);
router.patch('/:id', authController.protect, newsController.updatenews);
router.delete('/:id', authController.protect, newsController.removenews);
module.exports = router;
