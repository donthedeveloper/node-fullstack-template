const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user');
// TODO: re-run tests whenever a code change happens in the app

describe('\'/api/user\' Route', function() {
    describe('POST Request', function() {
        const email = 'thisisnotarealemail@gmail.com';
        const password = 'password';

        describe('made with an empty payload', function() {
            const errorMessage = 'All fields required.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body).to.have.property('message').eql(errorMessage);
                        done();
                    });
            });
        });

        describe('made without an email address', function() {
            const errorMessage = 'All fields required.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({password})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body).to.have.property('message').eql(errorMessage);
                        done();
                    });
            });
        });

        describe('made without a password', function() {
            const errorMessage = 'All fields required.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({email})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body).to.have.property('message').eql(errorMessage);
                        done();
                    });
            });
        });

        describe('made with all necessary fields', function() {
            const status = 201;
            it(`responds with status ${status}`, async function() {
                const userCreate = await chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({email, password});
                expect(userCreate).to.have.status(status);

                const user = await User.findOne({email});
                expect(user).to.include({email});
            });
        });

        describe('made with duplicate (unique) email', function() {
            const status = 400;
            it(`responds with a status of ${status}`, async function() {
                await User.create({email, password});

                return chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({email, password})
                        .then((response) => {
                            expect(response).to.be.null; // TODO: is this even needed?
                        })
                        .catch((error) => {
                            expect(error).to.have.status(status);
                        });
            });
        });

        afterEach(function() {
            return User.deleteOne({email});
        });
    });

    describe('PATCH Request', function() {
        const emailToChangeTo = 'thisisnotarealemail3@gmail.com';
        const user1 = {
            email: 'thisisnotarealemail@gmail.com',
            password: 'password'
        }
        const user2 = {
            email: 'thisisnotarealemail2@gmail.com',
            password: 'password'
        }
    
        beforeEach(function() {
            return Promise.all([
                User.create(user1),
                User.create(user2)
            ]);
        });

        // test for user not found (404)
        describe('made with an non-existing, invalid user id', function() {
            const errorMessage = 'Invalid User ID.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .patch(`/api/user/thisiddoesntexist`)
                    .type('form')
                    .send({})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body).to.have.property('message').eql(errorMessage);
                        done();
                    });
            });
        });

        describe('made with an non-existing, valid user id', function() {
            const status = 404;
            it(`responds with status ${status}`, function(done) {
                chai.request(app)
                    .patch(`/api/user/${mongoose.Types.ObjectId()}`)
                    .type('form')
                    .send({})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        done();
                    });
            });
        });

        describe('made with an empty payload', function() {
            const status = 200;
            it(`responds with status ${status} and includes user.email with value of ${user1.email}`, function(done) {
                User.findOne({email: user1.email})
                .then((user) => {
                    chai.request(app)
                    .patch(`/api/user/${user._id}`)
                    .type('form')
                    .send({})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body).to.have.property('user');
                        expect(res.body.user).to.be.an('object');
                        expect(res.body.user.email).to.equal(user1.email);
                        done();
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
            });
        });

        // TODO: get async await to work in tests
        // describe('made with an empty payload', function() {
        //     const status = 200;
        //     it(`responds with status ${status} and includes user.email with value of ${user1.email}`, async function() {
        //         const user = await User.findOne({email: user1.email});

        //         chai.request(app)
        //         .patch(`/api/user/${user._id}`)
        //         .type('form')
        //         .send({})
        //         .then((res) => {
        //             expect(res).to.have.status(status);
        //             expect(res.body).to.have.property('user');
        //             expect(res.body.user).to.be.an('object');
        //             expect(res.body.user.email).to.equal(user1.email);
        //         }, (err) => {
        //             console.log('IS SOMETIMES RECEIVING A 404. WHY U NO WORK!?');
        //         });
        //     });
        // });

        describe('made with a different email address to update', function() {
            const status = 200;
            it(`responds with status ${status} and includes user.email with value of ${emailToChangeTo}`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                        .patch(`/api/user/${user._id}`)
                        .type('form')
                        .send({email: emailToChangeTo})
                        .end(function(err, res) {
                            expect(res).to.have.status(status);
                            expect(res.body).to.have.property('user');
                            expect(res.body.user).to.be.an('object');
                            expect(res.body.user.email).to.equal(emailToChangeTo);
                            done();
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            });
        });

        describe('made with a duplicate (unique) email address to update', function() {
            const errorMessage = '';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                        .patch(`/api/user/${user._id}`)
                        .type('form')
                        .send({email: user2.email})
                        .end(function(err, res) {
                            expect(res).to.have.status(status);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.be.an('string');
                            // TODO: create and test for a custom validation message (which isnt set up yet in model)
                            done();
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            });
        });

        afterEach(function() {
            return Promise.all([
                User.remove({email: user1.email}),
                User.remove({email: user2.email}),
                User.remove({email: emailToChangeTo})
            ]);
        });
    });


});