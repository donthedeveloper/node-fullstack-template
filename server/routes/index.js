const express = require('express');
const path = require('path');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../browser/dist/index.html'));
});

module.exports = router;