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
    try {
        const user = await User.findOne({
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
        user.resetPassword = undefined;
        // todo: either need to not get password field back OR prevent password from being submitted
        // todo: should we use update instead of save?
        // todo: https://stackoverflow.com/questions/43561568/delete-a-property-from-a-returned-mongoose-document-instance-mongodb
        // console.log(chalk.magenta('user:', user));

        return user.save()
            .then((updatedUser) => {
                // res.json({user: updatedUser});
                // updatedUser.resetPassword = undefined;
                // updatedUser.password = undefined;
                // console.log(chalk.magenta('user:', updatedUser));
                // await updatedUser.save()
                    // .then((hey) => {
                        res.json({user: hey});
                    // })
                    // .catch((err) => {
                        // console.log('reset token error:', err);
                        // next(err);
                    // });
            })
            .catch((err) => {
                // console.log('change password error:', err);
                next(err);
            })

        // const user = await user.save();
        // User.findById(user.id).select('-password')
        //     .then((user) => {
        //         user.resetPassword = undefined;
        //         user.save()
        //             .then((user) => {
        //                 res.json(user);
        //             })
        //     })
    } catch(e) {
        console.error(e);
    }
});

module.exports = router;