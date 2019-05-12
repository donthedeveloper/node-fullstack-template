const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user');

// TODO: re-run tests whenever a code change happens in the app

describe('\'/api/login\' Route', () => {
    describe('POST Request', () => {
        const email = 'thisisnotarealemail@gmail.com';
        const password = 'rightpassword';
        const wrongPassword = 'wrongpassword';

        beforeEach(function() {
            return User.create({email, password});
        });

        describe('made with an invalid email and password', function() {
            const errorMessage = 'Incorrect username and password combination.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/login')
                    .type('form')
                    .send({
                        email,
                        password: wrongPassword
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(status);
                        expect(res.body.error.message).to.equal(errorMessage);
                        done();
                    });
            });
        });

        describe('made with a valid email and password', function() {
            const status = 200;
            it(`responds with a user object and status ${status}`, function(done) {
                chai.request(app)
                    .post('/api/login')
                    .type('form')
                    .send({email, password})
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('user');
                        expect(res.body.user).to.be.an('object');
                        expect(res.body.user.email).to.equal(email);
                        done();
                    });
            });
        });

        afterEach(function() {
            return User.remove({email});
        });
    });
});