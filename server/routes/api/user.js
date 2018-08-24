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

    // const user = await User.findById(userId).select('-password');
    const user = await User.findById(userId);
    if (!user) {
        // TODO: should we even tell them the user exists? maybe just throw a 500
        // TODO: why aren't we simply passing this through to next?
        res.status(404);
        return res.json({
            error: {
                message: `User doesn't exist.`
                // TODO: label this with a custom name. What should it be?
            }
        });
    }

    if (password && !oldPassword) {
        const error = {
            message: 'Current password required in order to change password.',
            name: 'ValidationError'
        }
        return next(error);
    }

    if (!password && oldPassword) {
        const error = {
            message: 'If your old password is provided, it is assumed that you are trying to change your password. Please provide a new password.',
            name: 'ValidationError'
        }
        return next(error);
    }

    // TODO: we need to error out when password is filled but old password is not
    if (password && oldPassword) {
        try {
            await User.authenticate(user.email, oldPassword);

            if (password) {
                fields.password = password;
            }
        } catch(e) {
            e.message = 'Incorrect current password.';
            return next(e);
        }
    }

    return User.findByIdAndUpdate(userId, fields, {
        context: 'query',
        new: true,
        runValidators: true
    }).select('-password')
        .then((user) => {
            return res.json({user});
        })
        .catch((err) => {
            return next(err);
        });

        // .exec((error, user) => {

        //     User.authenticate(user.email, oldPassword, function(error) {
        //         if (err) {
        //             return next(error);
        //         }
        //     });

        //     res.json({user});
        // });

    // return user.update(fields)
    //     .then(() => {
    //         console.log('user:', user);
    //         return res.json(user);
    //     })
    //     .catch((err) => {
    //         return next(err);
    //     })

    // User.findByIdAndUpdate(userId, fields, {
    //     context: 'query',
    //     new: true,
    //     runValidators: true
    // }).select('-password')
    //     .exec((error, user) => {
    //         res.json({user});
    //     });
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