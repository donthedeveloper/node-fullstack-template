const express = require('express');
const router = express.Router();

const userApi = require('./user');
const loginApi = require('./login');
const logoutApi = require('./logout');

router.use('./user', userApi);
router.use('./login', loginApi);
router.use('./logout', logoutApi);

// TODO: set up catch-all error handler

module.exports = router;