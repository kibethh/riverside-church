const express = require('express');
const authController = require('../controllers/authController');
const eventsController = require('../controllers/eventsController');

const router = new express.Router();

// router.post('/', authController.protect, eventsController.createEvent);
router.post('/', eventsController.createEvent);
router.get('/', eventsController.getevents);
router.get('/:id', authController.protect, eventsController.searchevent);
router.patch('/:id', authController.protect, eventsController.updateevent);
router.delete('/:id', authController.protect, eventsController.removeevent);
module.exports = router;
