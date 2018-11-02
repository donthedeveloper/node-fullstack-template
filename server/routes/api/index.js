const chalk = require('chalk');
const express = require('express');
const router = express.Router();

const forgotApi = require('./forgot');
const loginApi = require('./login');
const logoutApi = require('./logout');
const resetApi = require('./reset');
const userApi = require('./user');
const whoamiApi = require('./whoami');

router.use('/forgot', forgotApi);
router.use('/login', loginApi);
router.use('/logout', logoutApi);
router.use('/reset', resetApi);
router.use('/user', userApi);
router.use('/whoami', whoamiApi);

// API Catchall Error Handlers

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'AuthenticationError') {
    err.status = 400;
  }
  next(err);
});

router.use((req, res, next) => {
  const err = new Error('Route not found.');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = router;