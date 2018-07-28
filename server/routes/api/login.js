const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
    
    User.authenticate(email, password, function(error, user) {
        if (error || !user) {
            const err = new Error('Wrong email or password.');
            err.status = 400;
            return next(err);
        } else {
            req.session.userId = user._id;
            res.sendStatus(200);
        }
    });
});

module.exports = router;