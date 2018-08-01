const bcrypt = require('bcrypt');
// TODO: get rid of debug
const mongoose = require('mongoose').set('debug', true);

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        type: String,
        unique: true // TODO: set up custom error message, possibly catch the error code in the route and build a custom message
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

UserSchema.pre('save', function(next) {
    let password = this.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;