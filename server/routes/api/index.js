const express = require('express');
const router = express.Router();

const userApi = require('./user');
const loginApi = require('./login');
const logoutApi = require('./logout');
const whoamiApi = require('./whoami');

router.use('/user', userApi);
router.use('/login', loginApi);
router.use('/logout', logoutApi);
router.use('/whoami', whoamiApi);

// API Catchall Error Handler
// TODO: send proper error code and get correct error messaging from error object
router.use((err, req, res, next) => {
  console.log('errors:', err.errors);
  if (err.name === 'ValidationError') {
    err.status = 400;
  }
  next(err);
})

// router.use((err, req, res, next) => {
//   if (err.code === 11000) {
//     err.status = 400;
//   }
//   next(err);
// });

router.use((req, res, next) => {
  const err = new Error('Route not found.');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  })
});

module.exports = router;