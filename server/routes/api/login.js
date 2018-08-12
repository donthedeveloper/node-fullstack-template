const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res, next) => {
    const {email, password} = req.body;
    
    User.authenticate(email, password, function(error, user) {
        if (error || !user) {
            return next(error);
        } else {
            req.session.userId = user._id;
            res.sendStatus(200);
        }
    });
});

module.exports = router;