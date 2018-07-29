const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/', (req, res, next) => {
    const session = req.session;
    const userId = session ? req.session._userId : null;
    if (!userId) {
        return res.send({user: null});
    }

    return User.findOne({where: userId})
        .exec((error, user) => {
            if (error) {
                return next(error);
            } else {
                return res.send(user);
            }
        });
});

module.exports = router;