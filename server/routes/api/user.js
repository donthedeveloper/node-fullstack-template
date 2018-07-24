const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const err = new Error('All fields required.');
        res.status = 400;
        return next(err);
    }

    User.create({email, password}, (error, user) => {
        if (error) {
            return next(error);
        }
        req.session.userId = user._id;
        res.sendStatus(201);
    });
});

module.exports = router;