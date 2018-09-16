const express = require('express'),
    router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');

router.patch('/:userId', async (req, res, next) => {
    const {email, password} = req.body;
    const oldPassword = req.body.old_password;
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const error = {
            message: 'Invalid User ID.',
            name: 'ValidationError' // TODO: should this be a "validation" error?
        };
        return next(error);
    }

    const fields = {};
    if (req.body.hasOwnProperty('email')) {
        fields.email = email;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
        // TODO: should we even tell them the user exists? maybe just throw a 500
        // TODO: why aren't we simply passing this through to next?
        res.status(404);
        // TODO: shouldn't this just pass it through next
        return res.json({
            error: {
                message: `User doesn't exist.`
                // TODO: label this with a custom name. What should it be? Authentication?
            }
        });
    }

    if (req.body.hasOwnProperty('email')) {
        user.email = email;
    }

    if (req.body.hasOwnProperty('old_password')) {
        user.old_password = oldPassword;
    }

    if (req.body.hasOwnProperty('password')) {
        user.password = password;
    }

    return user
        .save()
        .then((user) => {
            return res.json({user});
        })
        .catch((err) => {
            return next(err);
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