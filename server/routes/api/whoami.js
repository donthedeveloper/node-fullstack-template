const express = require('express');
const router = express.Router();

const {Permission,Role} = require('../../models');

router.get('/', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
        return;
    }

    Role.findOne({
        where: {
            id: req.session.user.roleId
        },
        include: [{model:Permission}]
    })
    .then((role) => {
        const permissionNames = role.permissions.map((permission) => permission.getDataValue('name'));
        req.session.user.permissions = permissionNames;

        req.session.user.roleName = role.getDataValue('name');

        res.send(req.session.user);
    })
    .catch((err) => {
        console.error(err.message);
    });
});

module.exports = router;