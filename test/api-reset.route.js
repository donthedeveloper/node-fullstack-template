const chai = require('chai');
const chaiHttp = require('chai-http');
const chalk = require('chalk');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user/user');

// TODO: re-run tests whenever a code change happens in the app

describe('\'/api/reset/:token\' Route', () => {
    const email = 'thisisnotarealemail@gmail.com';
    const tokenErrorMessage = 'Invalid or expired token.';
    const invalidToken = 'heyImanInValiDToken';
    const password = 'rightpassword';

    describe('GET Request', () => {

        beforeEach(function() {
            return User.create({email, password});
        });

        describe(`send with a token that doesn't exist or is invalid`, function() {
            const status = 400;
            it(`responds with status ${status}`, function(done) {
                chai.request(app)
                    .get(`/api/reset/${invalidToken}`)
                    .end((err, res) => {
                        expect(res).to.have.status(status);
                        expect(res.body.error.message).to.equal(tokenErrorMessage);
                        done();
                    });
            });
        });

        describe(`send with a token that is expired`, function() {
            const status = 400;
            it(`responds with status ${status} and error message ${tokenErrorMessage}`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        User.findOne({email})
                            .then((user) => {
                                user.resetPassword.expiration = Date.now(); // << culprit (monkaS)
                                user.save()
                                    .then((user) => {
                                        chai.request(app)
                                            .get(`/api/reset/${user.resetPassword.token}`)
                                            .end((err, res) => {
                                                expect(res).to.have.status(status);
                                                expect(res.body.error.message).to.equal(tokenErrorMessage);
                                                done();
                                            });
                                    })
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    });
            })
        });

        describe(`send a valid token`, function() {
            const status = 200;
            it(`responds with a status ${status}`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        User.findOne({email})
                            .then((user) => {
                                chai.request(app)
                                    .get(`/api/reset/${user.resetPassword.token}`)
                                    .end((err, res) => {
                                        expect(res).to.have.status(status);
                                        done();
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    });
            });
        });

        afterEach(function() {
            return User.remove({email});
        });
    });

    describe('POST request', function() {
        beforeEach(function() {
            return User.create({email, password});
        });

        describe(`send with a token that doesn't exist or is invalid`, function() {
            const status = 400;
            it(`responds with status ${status}`, function(done) {
                chai.request(app)
                    .post(`/api/reset/${invalidToken}`)
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        expect(res).to.have.status(status);
                        expect(res.body.error.message).to.equal(tokenErrorMessage);
                        done();
                    });
            });
        });

        describe(`send with a token that is expired`, function() {
            const status = 400;
            it(`responds with status ${status} and error message ${tokenErrorMessage}`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        User.findOne({email})
                            .then((user) => {
                                user.resetPassword.expiration = Date.now();
                                user.save()
                                    .then((user) => {
                                        chai.request(app)
                                            .post(`/api/reset/${user.resetPassword.token}`)
                                            .type('form')
                                            .end((err, res) => {
                                                expect(res).to.have.status(status);
                                                expect(res.body.error.message).to.equal(tokenErrorMessage);
                                                done();
                                            });
                                    })
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    });
            })
        });

        describe(`send with a token that is valid, with a blank password`, function() {
            const passwordEmptyErrorMessage = 'You must provide a password.';
            const status = 400;
            const validationErrorName = 'ValidationError';
            it(`responds with status ${status} and error message ${tokenErrorMessage}`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        User.findOne({email})
                            .then((user) => {
                                chai.request(app)
                                    .post(`/api/reset/${user.resetPassword.token}`)
                                    .type('form')
                                    .end((err, res) => {
                                        expect(res).to.have.status(status);
                                        expect(res.body.error.name).to.equal(validationErrorName);
                                        expect(res.body.error.errors.password.message).to.equal(passwordEmptyErrorMessage);
                                        done();
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    });
            });
        });

        describe(`send with a token that is valid, with a password`, function() {
            const newPassword = 'thisisanewpassword';
            const status = 200;
            it(`responds with status ${status} and include user`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        User.findOne({email})
                            .then((user) => {
                                chai.request(app)
                                    .post(`/api/reset/${user.resetPassword.token}`)
                                    .type('form')
                                    .send({password: newPassword})
                                    .end((err, res) => {
                                        expect(res).to.have.status(status);
                                        expect(res.body.user.email).to.equal(email);
                                        expect(res.body.user).to.not.have.property('resetPassword');
                                        done();
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    });
            });
        });

        afterEach(function() {
            return User.remove({email});
        });
    })
});