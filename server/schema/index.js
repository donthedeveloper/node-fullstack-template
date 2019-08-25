const axios = require('axios');
const graphql = require('graphql');
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} = graphql;

const Permission = require('../models/permission/permission');
const User = require('../models/user/user');

const PermissionType = new GraphQLObjectType({
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        users: {
            resolve(parentValue) {
                return axios.get(`http://localhost:3001/permissions/${parentValue.id}/users`)
                    .then((response => response.data));
            },
            type: new GraphQLList(UserType)
        }
    }),
    name: 'Permission'
});

const UserType = new GraphQLObjectType({
    fields: () => ({
        email: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        permission: {
            resolve({ permissionId }) {
                return axios.get(`http://localhost:3001/permissions/${permissionId}`)
                    .then(response => response.data);
            },
            type: PermissionType
        }
    }),
    name: 'User'
});

const RootQuery = new GraphQLObjectType({
    fields: {
        permission: {
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, { id }) {
                return Permission.findOne({
                    _id: id
                })
            },
            type: PermissionType
        },
        permissions: {
            resolve() {
                return Permission.find();
            },
            type: GraphQLList(PermissionType)
        },
        user: {
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, { id }) {
                return axios.get(`http://localhost:3001/users/${id}`)
                    .then(response => response.data);
            },
            type: UserType
        }
    },
    name: 'RootQueryType'
});

const mutation = new GraphQLObjectType({
    fields: {
        addPermission: {
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, { name }) {
                return Permission.create({
                    name
                });
            },
            type: PermissionType
        },
        deletePermission: {
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            // todo: this probably should resolve with the id of the deleted, but we should confirm that it was deleted
            resolve(parentValue, { id }) {
                return Permission.deleteOne({
                    _id: id
                })
            },
            type: PermissionType
        },
        // updatePermission: {
        //     args: {
        //         id: {
        //             type: new GraphQLNonNull(GraphQLString)
        //         },
        //         input: PermissionType
        //     },
        //     async resolve(parentValue, { id, input }) {
        //         const permission = await Permission.findOne({
        //             _id: id
        //         });
        //         return Permission.updateOne({
        //             where: {
        //                 _id: 'id'
        //             }
        //         }, input);
        //     },
        //     type: PermissionType
        // },
        addUser: {
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                permissionId: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, { email, firstName, lastName, permissionId, password }) {
                // return axios.post('http://localhost:3001/users', { email, firstName, lastName, permissionId })
                //     .then(response => response.data)

                return User.create({
                    email,
                    password
                });
            },
            type: UserType
        },
        deleteUser: {
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3001/users/${id}`)
                    .then(response => response.data);
            },
            type: UserType
        },
        editUser: {
            args: {
                email: {
                    type: GraphQLString
                },
                firstName: {
                    type: GraphQLString
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                lastName: {
                    type: GraphQLString
                },
                permissionId: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3001/users/${args.id}`, args)
                    .then(response => response.data);
            },
            type: UserType
        }
    },
    name: 'Mutation'
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
