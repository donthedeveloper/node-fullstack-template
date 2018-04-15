const express = require('express');
const router = express.Router();

const {User} = require('../../models');

router.get('/', (req, res) => {
    req.session.reset();
    res.sendStatus(200);
})

module.exports = router;