const chai = require('chai');
const chaiHttp = require('chai-http');
const chalk = require('chalk');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user');

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
                                user.resetPassword.expiration = Date.now(); // << culprit
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
        const newPassword = 'thisisanewpassword';

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
                                        expect(err.response.body.error.name).to.equal(validationErrorName);
                                        expect(err.response.body.error.errors.password.message).to.equal(passwordEmptyErrorMessage);
                                        done();
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    });
            });
        });

        // TODO: check that it WORKS!

        // TODO: this isnt necessary (I THINK) because what is an incorrect password
        // describe(`send with a token that is valid, with an incorrect password`, function() {
        //     const invalidPassword = 'invalidPassword';
        //     const passwordInvalidErrorMessage = 'Invalid old password.';
        //     const status = 400;
        //     const validationErrorName = 'ValidationError';
        //     it(`responds with status ${status} and error message ${tokenErrorMessage}`, function(done) {
        //         chai.request(app)
        //             .post('/api/forgot')
        //             .type('form')
        //             .send({email})
        //             .end((err, res) => {
        //                 User.findOne({email})
        //                     .then((user) => {
        //                         chai.request(app)
        //                             .post(`/api/reset/${user.resetPassword.token}`)
        //                             .type('form')
        //                             .send({password: invalidPassword})
        //                             .end((err, res) => {
        //                                 console.log('err response body:', err.response.body);
        //                                 // console.log('body:', res.body);
        //                                 // console.log('res:', res.body.error.errors);
        //                                 expect(res).to.have.status(status);
        //                                 expect(err.response.body.error.name).to.equal(validationErrorName);
        //                                 expect(err.response.body.error.errors.password.message).to.equal(passwordInvalidErrorMessage);
        //                                 done();
        //                             });
        //                     })
        //                     .catch((err) => {
        //                         console.error(err);
        //                     });
        //             });
        //     });
        // });

        afterEach(function() {
            return User.remove({email});
        });
    })
});