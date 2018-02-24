require('dotenv').config();
const {db, User, Role, Permission} = require('./index');

const chalk = require('chalk');

const users = [
    {
        email: 'don@test.com',
        password: 'test',
        first_name: 'don',
        last_name: 'hansen'
    }
];

const roles = [
    {
        name: 'user'
    },
    {
        name: 'admin'
    }
];

// PERMISSION CONSTANTS
const USERADD = 'user_add';
const USEREDIT = 'user_edit';
const USERDELETE = 'user_delete';

const permission = [
    {name: USERADD},
    {name: USEREDIT},
    {name: USERDELETE}
];

db.sync({force:true})
    .then(() => {
        console.log(chalk.blue('Dropped old data.'));
        // CREATE ROLES
        return roles.bulkCreate(roles, {individualHooks: true});
    })
    .then(() => {
        console.log(chalk.blue('Created roles'));
        return Permission.bulkCreate(permissions, {individualHooks: true});
    })
    .then((permissions) => {
        console.log(chalk.blue('Created permissions'));
        permissions.forEach((permission) => {
            const roleIdArr = [];
            switch (permission.name) {
                case USERADD:
                // TODO: BUILD LINKS IN RELATIONSHIP TABLE
            }
        })
    })
    .then(() => {

        // CREATE USERS
        return User.bulkCreate(users, {individualHooks: true})
    })
    .finally(() => {
        db.close();
    })
    .catch((err) => {
        console.error('There was totally a problem:', err);
    });