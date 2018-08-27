const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user');
// TODO: re-run tests whenever a code change happens in the app

describe('\'/api/user\' Route', function() {
    const emailDuplicateErrorMessage = 'This email address is already taken.';
    const emailEmptyErrorMessage = 'You must provide an email address.';
    const validationErrorName = 'ValidationError';
    describe('POST Request', function() {
        const email = 'thisisnotarealemail@gmail.com';
        const password = 'password';
        const passwordEmptyErrorMessage = 'You must provide a password.';

        describe('made with an empty payload', function() {
            const status = 400;
            it(`responds with status ${status} and includes error messages '${emailEmptyErrorMessage}' & '${passwordEmptyErrorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body.error.name).to.equal(validationErrorName);
                        expect(res.body.error.errors.email.message).to.equal(emailEmptyErrorMessage);
                        expect(res.body.error.errors.password.message).to.equal(passwordEmptyErrorMessage);
                        done();
                    });
            });
        });

        describe('made without an email address', function() {
            const status = 400;
            it(`responds with status ${status} and includes message '${emailEmptyErrorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({password})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body.error.name).to.equal(validationErrorName);
                        expect(res.body.error.errors.email.message).to.equal(emailEmptyErrorMessage);
                        done();
                    });
            });
        });

        describe('made without a password', function() {
            const status = 400;
            it(`responds with status ${status} and includes message '${passwordEmptyErrorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({email})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body.error.name).to.equal(validationErrorName);
                        expect(res.body.error.errors.password.message).to.equal(passwordEmptyErrorMessage);
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

        describe('made with duplicate email, which should be unique', function() {
            const status = 400;
            it(`responds with a status of ${status} and includes message '${emailDuplicateErrorMessage}'`, async function() {
                await User.create({email, password});

                return chai.request(app)
                    .post('/api/user')
                    .type('form')
                    .send({email, password})
                        .catch((error) => {
                            expect(error).to.have.status(status);
                            expect(error.response.body.error.name).to.equal(validationErrorName);
                            expect(error.response.body.error.errors.email.message).to.equal(emailDuplicateErrorMessage);
                        });
            });
        });

        afterEach(function() {
            return User.remove({email});
        });
    });

    describe('PATCH Request', function() {
        const emailToChangeTo = 'thisisnotarealemail3@gmail.com';
        const password = 'test';
        const oldPasswordThatDoesntWork = 'oldPasswordThatDoesntWork';
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
        describe('made with an invalid user id', function() {
            const errorMessage = 'Invalid User ID.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .patch(`/api/user/thisiddoesntexist`)
                    .type('form')
                    .send({})
                    .end(function(err, res) {
                        expect(res).to.have.status(status);
                        expect(res.body.error).to.have.property('name').eql(validationErrorName);
                        expect(res.body.error).to.have.property('message').eql(errorMessage);
                        done();
                    });
            });
        });

        describe('made with a non-existing user id', function() {
            const errorMessage = `User doesn't exist.`;
            const status = 404;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        User.remove({email: user1.email})
                            .then(() => {
                                chai.request(app)
                                    .patch(`/api/user/${user._id}`)
                                    .type('form')
                                    .send({})
                                    .end(function(err, res) {
                                        expect(res).to.have.status(status);
                                        expect(res.body.error.message).to.equal(errorMessage);
                                        done();
                                    });
                            })
                            .catch((err) => {
                                done(err);
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        })

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
                        done(err);
                    });
            });
        });

        describe('made with an empty email address', function() {
            const status = 400;
            it(`responds with status ${status} and includes message ${emailEmptyErrorMessage}`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                        .patch(`/api/user/${user._id}`)
                        .type('form')
                        .send({
                            email: ''
                        })
                        .end(function(err, res) {
                            expect(res).to.have.status(status);
                            expect(res.body.error).to.have.property('name').eql(validationErrorName);
                            expect(res.body.error.errors.email.message).to.equal(emailEmptyErrorMessage);
                            done();
                        });
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        // // TODO: get async await to work in tests
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
                        done(err);
                    });
            });
        });

        describe('made with a duplicate (unique) email address to update', function() {
            const status = 400;
            it(`responds with status ${status} and includes message '${emailDuplicateErrorMessage}'`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                            .patch(`/api/user/${user._id}`)
                            .type('form')
                            .send({email: user2.email})
                            .end(function(err, res) {
                                expect(res).to.have.status(status);
                                expect(err.response.body.error.name).to.equal(validationErrorName);
                                expect(err.response.body.error.errors.email.message).to.equal(emailDuplicateErrorMessage);
                                done();
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        describe('made with a new password, without providing a current (old) password', function() {
            const status = 400;
            const errorMessage = 'Old password required in order to change password.';
            it(`responds with status ${status} and includes message '${errorMessage}`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                            .patch(`/api/user/${user._id}`)
                            .type('form')
                            .send({
                                email: emailToChangeTo,
                                password
                            })
                            .end(function(err, res) {
                                expect(res).to.have.status(status);
                                expect(err.response.body.error.name).to.equal(validationErrorName);
                                expect(err.response.body.error.errors.old_password.message).to.equal(errorMessage);
                                done();
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        describe('Providing a current (old) password, but not including a new password', function() {
            const status = 400;
            const errorMessage = 'If your old password is provided, it is assumed that you are trying to change your password. Please provide a new password.';
            it(`responds with status ${status} and includes message '${errorMessage}`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                            .patch(`/api/user/${user._id}`)
                            .type('form')
                            .send({
                                email: emailToChangeTo,
                                old_password: user1.password
                            })
                            .end(function(err, res) {
                                expect(res).to.have.status(status);
                                expect(err.response.body.error.name).to.equal(validationErrorName);
                                expect(err.response.body.error.errors.password.message).to.equal(errorMessage);
                                done();
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        describe('Providing an incorrect old password, and a new password', function() {
            const status = 400;
            const errorMessage = 'Invalid old password.';
            it(`responds with status ${status} and includes message '${errorMessage}`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                            .patch(`/api/user/${user._id}`)
                            .type('form')
                            .send({
                                email: emailToChangeTo,
                                old_password: oldPasswordThatDoesntWork,
                                password
                            })
                            .end(function(err, res) {
                                expect(res).to.have.status(status);
                                expect(err.response.body.error.name).to.equal(validationErrorName);
                                expect(err.response.body.error.errors.old_password.message).to.equal(errorMessage);
                                done();
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });

        describe('Providing a correct old password, and a new password', function() {
            const status = 200;
            it(`responds with status ${status}`, function(done) {
                User.findOne({email: user1.email})
                    .then((user) => {
                        chai.request(app)
                            .patch(`/api/user/${user._id}`)
                            .type('form')
                            .send({
                                old_password: user1.password,
                                password
                            })
                            .end(function(err, res) {
                                expect(res).to.have.status(status);
                                expect(res.body).to.have.property('user');
                                expect(res.body.user).to.be.an('object');
                                done();
                            });
                    })
                    .catch((err) => {
                        done(err);
                    });
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