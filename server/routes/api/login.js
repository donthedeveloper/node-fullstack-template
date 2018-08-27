const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res, next) => {
    const {email, password} = req.body;

    return User.authenticate({email, password})
        .then((user) => {
            req.session.userId = user._id;
            res.sendStatus(200);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;