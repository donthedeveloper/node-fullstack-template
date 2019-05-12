const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/', (req, res, next) => {
    const {email, password} = req.body;

    // todo: we should probably validate empty email and password and send validation error back
    // if we do this, remember to update login form with field errors

    return User.authenticate({email, password})
        .then((user) => {
            const userObj = user.toObject();
            const {password, resetPassword, ...trimmedUser} = userObj;
            req.session.userId = user._id;
            res.json({
                user: trimmedUser
            });
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;