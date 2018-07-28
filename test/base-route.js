const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);

// TODO: re-run tests whenever a code change happens in the app
// TODO: test any route outside of root and api and make sure it serves a 200 (index html with react)
describe('\'/\' Route', function() {
    describe('GET Request', function() {
        const status = 200;
        it(`responds with status ${status}`, function(done) {
            chai.request(app)
                .get('/')
                .end(function(err, res) {
                    expect(res).to.have.status(status);
                    done();
                });
        });
    });
});