const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const PermissionSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String,
        unique: true,
        validate: validate({
            validator: 'isAlphanumeric',
            message: 'Provide an alphanumeric name.'
        })
    }
});

PermissionSchema.plugin(uniqueValidator, {
    message: 'This permission name is already taken.'
});

const Permission = mongoose.model('Permission', PermissionSchema);
module.exports = Permission;