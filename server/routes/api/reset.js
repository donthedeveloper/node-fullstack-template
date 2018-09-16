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
                error: {
                    message: `Invalid or expired token.`,
                    name: 'ValidationError'
                }
            });
        }
        res.json(user);
    })
    .catch((err) => {
        // TODO: 500 error?
        console.error(err);
    });
});

router.post('/:token', async (req, res, next) => {
    try {
        const user = await User.findOne({
            'resetPassword.token': req.params.token,
            'resetPassword.expiration': {
                $gt: Date.now()
            }
        }).select('-password');
    
        if (!user) {
            return next({
                error: {
                    message: `Invalid or expired token.`,
                    name: 'ValidationError'
                }
            });
        }

        user.password = req.body.password;
        return user.save()
            .then(async (updatedUser) => {
                updatedUser.resetPassword.token = null;
                updatedUser.resetPassword.expiration = null;
                await updatedUser.save();
                res.json({updatedUser});
            })
            .catch((err) => {
                next(err);
            })
    } catch(e) {
        console.error(e);
    }
});

module.exports = router;