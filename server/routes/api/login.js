const express = require('express');
const router = express.Router();

const {User, Role} = require('../../models');

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {email}
    })
    .then((user) => {
        if (user && user.validPassword(password)) {

        }
    })
    .catch((err) => {
        console.error(err)
    });
});

module.exports = router;