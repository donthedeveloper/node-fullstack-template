const crypto = require('crypto');
const express = require('express'),
    router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../../models/user/user');

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

                    // Nodemailer
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.PASSWORD_RESET_AUTH_EMAIL,
                            pass: process.env.PASSWORD_RESET_AUTH_PASSWORD
                        }
                    });

                    transporter.sendMail({
                        from: process.env.PASSWORD_RESET_AUTH_EMAIL,
                        to: user.email,
                        subject: 'Forgot Password Request',
                        html: `<p>You are receiving this because you, or someone else, requested a password reset. Click <a href="http://localhost:${process.env.PORT}/reset/${token}">here</a> to finish resetting your password.</p>`
                    }, (err, info) => {
                        console.error(err);
                    })

                    res.sendStatus(200);
                } catch(e) {
                    console.error(e);
                }
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