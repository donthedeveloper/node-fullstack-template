const bcrypt = require('bcrypt');
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
    }
});

UserSchema.plugin(uniqueValidator, {
    message: 'This email address is already taken.'
});

UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({email})
        .exec(function (error, user) {
            const errorObj = {
                message: 'Incorrect username and password combination.',
                name: 'AuthenticationError'
            };

            if (error || !user) {
                return callback(errorObj); // TODO: this isnt actually an auth error, this is a mongo or schema error
            }


            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback(errorObj);
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