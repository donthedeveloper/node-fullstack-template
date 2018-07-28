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
        const password = 'thisisnotarealemail@gmail.com';

        beforeEach(function() {
            return User.create({email, password});
        });

        describe('made with an empty payload', function() {
            const errorMessage = 'All fields required.';
            const status = 400;
            it(`responds with status ${status} and includes message '${errorMessage}'`, function(done) {
                chai.request(app)
                    .post('/api/login')
                    .type('form')
                    .send({})
                    .end((err, res) => {
                        expect(res).to.have.status(status);
                        expect(res.body).to.have.property('message').eql(errorMessage);
                        done();
                    });
            });
        })

        afterEach(function() {
            return User.deleteOne({email});
        });
    });
});