const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        type: String,
        unique: true, // TODO: set up custom error message, possibly catch the error code in the route and build a custom message
        validate: validate({
            validator: 'isEmail',
            message: 'Provide a proper email address.'
        })
    },
    password: {
        required: true,
        type: String
    }
});

UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({email})
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
}

UserSchema.pre('findOneAndUpdate', function(next) {
    const password = this.getUpdate().password;
    if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.update({}, {password: hash});
            next();
        });
    } else {
        next();
    }
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