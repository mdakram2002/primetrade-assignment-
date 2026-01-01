const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate, authorize } = require('../middleware/auth');
const validation = require('../middleware/validation');

// All task routes require authentication
router.use(authenticate);

// Task routes
router.get(
  '/',
  validation.getTasksValidation,
  taskController.getTasks
);

router.get(
  '/stats',
  taskController.getTaskStats
);

router.get(
  '/:id',
  taskController.getTaskById
);

router.post(
  '/',
  validation.taskValidation,
  taskController.createTask
);

router.put(
  '/:id',
  validation.taskValidation,
  taskController.updateTask
);

router.delete(
  '/:id',
  taskController.deleteTask
);

module.exports = router;