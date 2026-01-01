const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const validation = require('../middleware/validation');

// Public routes
router.post(
  '/register',
  validation.registerValidation,
  authController.register
);

router.post(
  '/login',
  validation.loginValidation,
  authController.login
);

// Protected routes
router.get(
  '/profile',
  authenticate,
  authController.getProfile
);

router.put(
  '/profile',
  authenticate,
  validation.updateProfileValidation,
  authController.updateProfile
);

module.exports = router;