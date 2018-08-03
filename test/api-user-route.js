const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user');
// TODO: re-run tests whenever a code change happens in the app

describe('\'/api/user\' Route', function() {
    describe('POST Request', function() {
        const email = 'thisisnotarealemail@gmail.com';
        const password = 'thisisnotarealemail@gmail.com';

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

    // TODO: write tests for PUT method
});