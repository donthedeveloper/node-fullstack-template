const express = require('express'),
    router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');

router.patch('/:userId', (req, res, next) => {
    const {email, password} = req.body;
    const userId = req.params.userId;

    const fields = {};
    if (email) {
        fields.email = email;
    }
    if (password) {
        fields.password = password
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error = {
            message: 'Invalid User ID.',
            name: 'ValidationError' // TODO: should this be a "validation" error?
        };
        return next(error);
    }

    User.findByIdAndUpdate(userId, fields, {
        context: 'query',
        new: true,
        runValidators: true
    }).select('-password')
        .exec((error, user) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                return res.sendStatus(404);
            }

            res.send({user});
        });
});

router.post('/', (req, res, next) => {
    const {email, password} = req.body;

    User.create({email, password}, (error, user) => {
        if (error) {
            return next(error);
        }
        req.session.userId = user._id;
        res.sendStatus(201);
    });
});

module.exports = router;