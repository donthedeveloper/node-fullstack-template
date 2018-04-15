const express = require('express');
const router = express.Router();

const {User} = require('../../models');

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        // TODO: return proper status
    }

    User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            email: email,
            password: password
        }
    })
    .then((user) => {
        if (user[1]) {
            // TODO: confirm proper status
            res.sendStatus(200);
        } else {
            // TODO: return proper status
        }
    })
    .catch((err) => {
        // TODO: return proper status
    });
});

module.exports = router;