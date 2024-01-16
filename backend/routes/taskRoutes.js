const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.route('/').post(taskController.saveTask).get(taskController.getAllTasks).put(taskController.editTask).patch(taskController.editAssignee);
router.route('/:id').get(taskController.getTask).delete(taskController.deleteTask);

module.exports = router;