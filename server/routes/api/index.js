const express = require('express');
const router = express.Router();

const userApi = require('./user');
const loginApi = require('./login');
const logoutApi = require('./logout');
const whoAmI = require('./whoami');

router.use('./user', userApi);
router.use('./login', loginApi);
router.use('./logout', logoutApi);
router.use('./whoami', whoAmIApi);

module.exports = router;