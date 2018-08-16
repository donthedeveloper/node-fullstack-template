const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/', (req, res, next) => {
    const session = req.session;
    const userId = session ? req.session.userId : null;
    if (!userId) {
        return res.send({user: null});
    }

    return User.findById(userId).select('-password')
        .exec((error, user) => {
            if (error) {
                return next(error);
            }
            return user ? res.json({user}) : res.json({user: null});
        });
});

module.exports = router;