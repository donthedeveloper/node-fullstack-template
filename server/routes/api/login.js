const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const err = new Error('All fields are required.');
        res.status = 401;
        return next(err);
    }
    
    User.authenticate(email, password, function(error, user) {
        // TODO: do we need to check for user again here?
        if (error || !user) {
            console.log('error:', error);
            console.log('user:', user);
            const err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id;
            res.sendStatus(200);
        }
    });

});

module.exports = router;