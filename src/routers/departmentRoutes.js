const express = require('express');
const authController = require('../controllers/authController');
const departmentController = require('../controllers/departmentController');

const router = new express.Router();

router.post('/', authController.protect, departmentController.createDepartment);
router.get('/', departmentController.allDepartments);

router.patch(
  '/:id',
  authController.protect,
  departmentController.updateDepartment
);
// router.patch('/:id', departmentController.updateDepartment);
router.delete(
  '/:id',
  authController.protect,
  departmentController.removeDepartment
);
// router.delete('/:id', departmentController.removeDepartment);
module.exports = router;
