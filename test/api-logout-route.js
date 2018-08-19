const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);

describe('\'/api/logout\' Route', function() {
    beforeEach(function(done) {
        chai.request(app)
            .post('/api/login')
            .type('form')
            .send({
                email: 'thisisnotarealemail@gmail.com',
                password: 'rightpassword'
            })
            .end(() => done());
    });

    describe('GET Request', function() {
        const status = 200;
        const agent = chai.request.agent(app);
        it(`logs out user and responds with a status of ${status}`, function(done) {
            chai.request(app)
                .get(`/api/logout`)
                .end(function(err, res) {
                    expect(res).to.have.status(status);
                    agent.get('/')
                        .then(() => {
                            expect(agent).to.not.have.cookie('connect.sid');
                            done();
                        })
                        .catch((err) => {
                            done(err);
                        });
                });
        });
    });
});