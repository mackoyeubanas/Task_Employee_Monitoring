const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.route('/').post(employeeController.saveEmployee).get(employeeController.getAllEmployee).put(employeeController.editEmployee);
router.route('/:id').get(employeeController.getEmployee).delete(employeeController.deleteEmployee);

module.exports = router;