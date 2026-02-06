const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { validateAuth } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);

module.exports = router;
