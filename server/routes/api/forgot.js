const crypto = require('crypto');
const express = require('express'),
    router = express.Router();
const User = require('../../models/user');

router.post('/', async (req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({email}).select('-password');
    try {
        if (user) {
            crypto.randomBytes(20, async function(err, buf) {
                const token = buf.toString('hex');
                user.resetPassword = {
                    token: token,
                    expiration: Date.now() + 1000 * 60 * 60
                }
                try {
                    await user.save();
                    res.sendStatus(200);
                } catch(e) {
                    console.error(e);
                }

                // TODO: Nodemailer!
            });
        } else {
            res.sendStatus(200);
        }
    } catch(e) {
        // TODO: send something to the catchall 500
        console.error(e);
    }
});

module.exports = router;