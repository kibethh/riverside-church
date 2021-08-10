const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.gallery, viewsController.indexPage);

// router.get('/about', viewsController.aboutPage);

router.get('/login', viewsController.loginPage);
router.get('/tithes', viewsController.tithesPage);

router.get('/sermons', viewsController.getSermons);

router.get('/sermons/:id', viewsController.readSermon);

router.get('/departments', viewsController.departments);

router.get('/departments/:id', viewsController.viewDepartment);

router.get('/admin', authController.protect, viewsController.adminPage);

module.exports = router;
