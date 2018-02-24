const express = require('express');
const router = express.Router();

const {User} = require('../../models');

// get all users from database
router.get('/', (req, res) => {
    User.findAll()
        .then(res.send)
        .catch(console.error);
});

module.exports = router;