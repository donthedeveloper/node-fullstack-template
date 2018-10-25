const chalk = require('chalk');
const express = require('express'),
    router = express.Router();
const User = require('../../models/user');

router.get('/:token', (req, res, next) => {
    return User.findOne({
        'resetPassword.token': req.params.token,
        'resetPassword.expiration': {
            $gt: Date.now()
        }
    }).select('-password')
    .then((user) => {
        if (!user) {
            return next({
                message: `Invalid or expired token.`,
                name: 'ValidationError'
            });
        }
        res.json(user);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/:token', async (req, res, next) => {
    let user = await User.findOne({
        'resetPassword.token': req.params.token,
        'resetPassword.expiration': {
            $gt: Date.now()
        }
    }).select('-password');

    if (!user) {
        return next({
            message: `Invalid or expired token.`,
            name: 'ValidationError'
        });
    }

    user.password = req.body.password;
    try {
        user = await user.save();
    } catch(e) {
        return next(e);
    }

    try {
        user = await User.findById(user.id).select('-password');
    } catch(e) {
        return next(e);
    }
    
    user.resetPassword = undefined;
    return user.save()
        .then((user) => {
            res.json({user});
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;