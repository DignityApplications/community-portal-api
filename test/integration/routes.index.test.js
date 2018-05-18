process.env.NODE_ENV = 'test';

// bring in node modules
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// bring in our Koa web server
const server = require('../../src/server/index');

// test the root route of our app
describe('GET /', () => {
    it('should return JSON', (done) => {
        chai.request(server).keepOpen()
        .get('/')
        .end((err, res) => {
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.status.should.equal('good!');
            res.body.message.should.eql('Community Portal API is running!');
            done();
        });
    });
});
