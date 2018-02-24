const {Sequelize,db,User} = require('./user');
const {Role} = require('./role');
const {Permission} = require('./permission');

User.belongsTo(Role);
Role.belongsToMany(Permission, {through: 'RolePermission'});
Permission.belongsToMany(Role, {through: 'RolePermission'});

module.exports = {Sequelize,db,User,Role,Permission};