const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const User = require('../server/models/user/user');

describe('\'/api/whoami\' Route', function() {
    const email = 'thisisnotarealemail@gmail.com';
    const password = 'rightpassword';
    const agent = chai.request.agent(app);

    beforeEach(function() {
        return User.create({email, password})
            .then(() => {
                return agent.post('/api/login')
                    .type('form')
                    .send({
                        email: 'thisisnotarealemail@gmail.com',
                        password: 'rightpassword'
                    })
            });
    });

    describe('GET Request', function() {
        const status = 200;
        it(`responds with a status of ${status} and a proper user object`, function(done) {
            User.findOne({email})
            .then(({_id}) => {
                agent.get('/api/whoami')
                    .then((res) => {
                        expect(res).to.have.status(status);
                        expect(res.body.user).to.be.an('object');
                        expect(res.body.user).to.include({
                            email,
                            _id: _id.toString()
                        });
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            })
            .catch((err) => {
                done(err);
            })
        });
    });

    afterEach(function() {
        return User.remove({email})
    })
});