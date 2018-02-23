const {db, User} = require('./index');

const chalk = require('chalk');

const users = [
    {
        email: 'don@test.com',
        password: 'test',
        first_name: 'don',
        last_name: 'hansen'
    }
];

db.sync({force:true})
    .then(() => {
        console.log(chalk.blue('Dropped old data.'));

        // CREATE USERS
        return User.bulkCreate(users, {individualHooks: true})
    })
    .catch((err) => {
        console.error('There was totally a problem:', err);
    });