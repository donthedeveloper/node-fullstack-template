const express = require('express'),
    router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');

router.patch('/:userId', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userId = req.params.userId;

    const fields = {};
    if (email) {
        fields.email = email;
    }
    if (password) {
        fields.password = password
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error = new Error('Invalid User ID.');
        error.status = 400;
        return next(error);
    }

    User.findByIdAndUpdate(userId, fields, {
        new: true,
        runValidators: true
    }).select('-password')
        .exec((error, user) => {
            if (error) {
                // console.log('whats the error:', error);
                return next(error);
            }
            if (!user) {
                return res.sendStatus(404);
            }

            res.send({user});
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