const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();


router.get('/', viewsController.index);

router.get('/login', viewsController.loginPage);

router.get('/about', viewsController.aboutPage);

router.get('/tithes', viewsController.tithesPage);

router.get('/sermons', viewsController.getSermons);

router.get('/news', viewsController.getNews);

router.get('/events', viewsController.getEvents);

router.get('/sermons/:id', viewsController.readSermon);

router.get('/events/:id', viewsController.readEvent);

router.get('/news/:id', viewsController.readNews);

router.get('/departments', viewsController.departments);

router.get('/departments/:id', viewsController.viewDepartment);

router.get('/admin', authController.protect, viewsController.adminPage);

router.get(
  '/editSermons',
  authController.protect,
  viewsController.modifySermonPage
);
router.get(
  '/editSermons/:id',
  authController.protect,
  viewsController.modifySermon
);
router.get(
  '/editMembers',
  authController.protect,
  viewsController.modifyMemberPage
);
router.get(
  '/editMembers/:id',
  authController.protect,
  viewsController.modifyMember
);
router.get('/editNews', authController.protect, viewsController.modifyNewsPage);
router.get('/editNews/:id', authController.protect, viewsController.modifyNews);
router.get(
  '/editEvents',
  authController.protect,
  viewsController.modifyEventPage
);
router.get(
  '/editEvents/:id',
  authController.protect,
  viewsController.modifyEvent
);
router.get(
  '/editDepartments',
  authController.protect,
  viewsController.modifyDepartmentPage
);
router.get(
  '/editDepartments/:id',
  authController.protect,
  viewsController.modifyDepartments
);

module.exports = router;
