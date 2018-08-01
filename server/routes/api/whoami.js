const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/', (req, res, next) => {
    const session = req.session;
    const userId = session ? req.session.userId : null;
    if (!userId) {
        return res.send({user: null});
    }
    console.log('session:', req.session);
    console.log('userId:', userId);

    return User.findById(userId)
        .exec((error, user) => {
            if (error) {
                return next(error);
            }

            // TODO: find out if user isnt found, what is returned. null?
            return user ? res.send({user: user}) : res.send({user: null});

            // else {
            //     // TODO: send only id & email
            //     console.log('uh oh where is the user');
            //     return res.send({user: null});
            // }
        });
});

module.exports = router;