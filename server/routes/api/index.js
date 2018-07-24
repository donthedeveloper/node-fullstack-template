const express = require('express');
const router = express.Router();

const userApi = require('./user');
const loginApi = require('./login');
const logoutApi = require('./logout');

router.use('/user', userApi);
router.use('/login', loginApi);
router.use('/logout', logoutApi);

// API Catchall Error Handler
router.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.json({
    message: err.message
  })
});

module.exports = router;