const express = require('express');
const { check } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register);

router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
