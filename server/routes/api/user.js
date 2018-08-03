const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.patch('/:userId', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const fields = {};
    if (email) {
        fields.email = email;
    }
    if (password) {
        fields.password = password
    }

    User.findByIdAndUpdate(req.params.userId, fields, {new: true})
        .exec((error, user) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                return res.sendStatus(404);
            }
            // TODO: figure out if we want to send only fields that were updated, back
            res.send(user);
        });
});

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const err = new Error('All fields required.');
        err.status = 400;
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