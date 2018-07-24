const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String
    }
});

UserSchema.pre('save', function(next) {
    let password = this.password;
    console.log('password:', password);
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;