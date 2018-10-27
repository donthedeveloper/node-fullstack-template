const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('*', (req, res) => {
    console.log('req:', req.params);
    res.render('index');
});

module.exports = router;