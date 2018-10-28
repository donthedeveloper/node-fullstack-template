const bcrypt = require('bcrypt');
const chalk = require('chalk');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    email: {
        required: [
            true,
            'You must provide an email address.'
        ],
        trim: true,
        type: String,
        unique: true,
        validate: validate({
            validator: 'isEmail',
            message: 'Provide a proper email address.'
        })
    },
    password: {
        required: [
            true,
            'You must provide a password.'
        ],
        type: String
    },
    resetPassword: {
        expiration: {
            type: Date
        },
        token: {
            type: String
        }
    }
});

UserSchema.virtual('old_password');

UserSchema.plugin(uniqueValidator, {
    message: 'This email address is already taken.'
});

UserSchema.statics.authenticate = async function({email, id, password}) {
    const errorObj = {
        message: 'Incorrect username and password combination.',
        name: 'AuthenticationError'
    };

    try {
        const user = email
            ? await User.findOne({email})
            : await User.findById(id);
        if (!user) {
            throw new Error();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    resolve(user);
                } else {
                    reject(errorObj);
                }
            });
        })
    } catch(e) {
        return Promise.reject(errorObj);
    }
}

UserSchema.pre('validate', async function(next) {
    const {password} = this;
    const oldPassword = this.old_password;
    const token = this.resetPassword.token;
        if (!this.isNew && password && !oldPassword && !token) {
            this.invalidate('old_password', 'Old password required in order to change password.');
        }

        if (!password && oldPassword) {
            this.invalidate('password', 'If your old password is provided, it is assumed that you are trying to change your password. Please provide a new password.');
        }

        if (oldPassword && password) {
            try {
                await UserSchema.statics.authenticate({
                    id: this._id,
                    password: oldPassword
                });
            } catch(e) {
                this.invalidate('old_password', 'Invalid old password.');
            }
            next();
        }

        // if (!this.isNew && password && !token && !oldPassword) {
        //     this.invalidate('resetPassword.token', 'Token required in order to change password');
        // }

        // TODO: possibly check this in the route, because we need to see the token in the route
        // if (!password && token) {
        //     this.invalidate('password', 'If a token is provided, it is assumed that you are trying to change your password. Please provide a new password');
        // }

    next();
});

UserSchema.pre('save', function(next) {
    const password = this.password;
    if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;