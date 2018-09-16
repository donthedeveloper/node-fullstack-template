const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user');

// TODO: re-run tests whenever a code change happens in the app

describe('\'/api/forget\' Route', () => {
    describe('POST Request', () => {
        const email = 'thisisnotarealemail@gmail.com';
        const emailThatDoesntExist = 'thisemaildoesntexist@gmail.com';
        const password = 'rightpassword';

        beforeEach(function() {
            return User.create({email, password});
        });

        describe(`sent with an email that doesn't exist`, function() {
            const status = 200;
            it(`responds with status ${status}`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({emailThatDoesntExist})
                    .end((err, res) => {
                        expect(res).to.have.status(status);
                        done();
                    });
            });
        });

        describe('made with an email that does exist', function() {
            const status = 200;
            it(`responds with status ${status}`, function(done) {
                chai.request(app)
                    .post('/api/forgot')
                    .type('form')
                    .send({email})
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        User.findOne({email})
                            .then((user) => {
                                expect(user).to.be.an('object');
                                expect(user.email).to.equal(email);
                                expect(user.resetPassword.token).to.be.string;
                                expect(user.resetPassword.token).to.not.be.empty;
                                expect(user.resetPassword.expiration.getTime()).to.be.lessThan(Date.now() + 1000 * 60 * 60);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            })
                    });
            });
        });

        afterEach(function() {
            return User.remove({email});
        });
    });
});