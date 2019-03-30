const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../server/models/user');
const expect = chai.expect;
chai.use(chaiHttp);

describe('\'/api/logout\' Route', function() {
    const user = {
        email: 'thisisnotarealemail@gmail.com',
        password: 'password'
    };

    beforeEach(function() {
        return User.create(user)
    });

    afterEach(function() {
        return User.remove({email: user.email});
    });

    describe('GET Request', function() {
        const status = 200;
        const agent = chai.request.agent(app);
        it(`logs out user and responds with a status of ${status}`, function(done) {
            agent.post('/api/login')
                .type('form')
                .send({
                    email: 'thisisnotarealemail@gmail.com',
                    password: 'rightpassword'
                })
                .then((res) => {
                    agent.get('/api/logout')
                        .then((res) => {
                            expect(res).to.have.status(status);
                            agent.get('/api/whoami')
                                .then((res) => {
                                    expect(res.body.user).to.be.null;
                                    done();
                                })
                                .catch((err) => done(err));
                        })
                });
        });
    });
});