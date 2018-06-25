const express = require('express');
const router = express.Router();

const userApi = require('./user');
const loginApi = require('./login');
const logoutApi = require('./logout');
const whoAmIApi = require('./whoami');

router.use('./user', userApi);
router.use('./login', loginApi);
router.use('./logout', logoutApi);
router.use('./whoami', whoAmIApi);

module.exports = router;