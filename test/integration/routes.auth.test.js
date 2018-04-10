process.env.NODE_ENV = 'test';

const server = require('../../src/server/index');
const knex = require('../../src/server/db/connection');

// bring in node modules and chai assertion libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const agent = chai.request.agent(server);
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('routes : auth', () => {
    // we need a fresh instance of the database before each test is run
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => { return knex.migrate.latest(); })
        .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('POST /auth/login', () => {
        it('should login a user if the credentials are valid', (done) => {
            chai.request(server)
            .post('/auth/login')
            .send({
                email: 'elliotsminion@gmail.com',
                password: 'test1234'
            })
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the JSON response body should have a 
                // key-value pair of {"status": "good!"}
                res.body.status.should.eql('good!');
                // the JSON response body should have a 
                // key-value pair of {"message": "User successfully authenticated!"}
                res.body.message.should.eql('User successfully authenticated!');
                // expect the response to contain a session cookie
                expect(res).to.have.cookie('koa:sess');
                done();
            });
        });

        it('should not login a user if the credentials are invalid', (done) => {
            chai.request(server)
            .post('/auth/login')
            .send({
                email: 'elliotsminion@gmail.com',
                password: 'incorrect-password'
            })
            .end((err, res) => {
                // there should be a 400 status code
                res.status.should.equal(400);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the JSON response body should have a 
                // key-value pair of {"status": "no good :("}
                res.body.status.should.eql('no good :(');
                // the JSON response body should have a 
                // key-value pair of {"message": "User authentication failed."}
                res.body.message.should.eql('User authentication failed.');
                done();      
            });
        });
    });

    describe('GET /auth/status', () => {
        it('should show the status as logged on if the user is authenticated', (done) => {
            // first we need to log on
            agent
            .post('/auth/login')
            .send({
                email: 'elliotsminion@gmail.com',
                password: 'test1234'
            })
            .then((res) => {
                // expect the response to contain a session cookie
                expect(res).to.have.cookie('koa:sess');
                return agent.get('/auth/status')
                .then((res) => {
                    // there should be no errors
                    //should.not.exist(err);
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a 
                    // key-value pair of {"loggedin": true}
                    res.body.loggedin.should.eql(true);
                    done();                        
                });
            })
        });

        it('should show the status as logged out if the user is not authenticated', (done) => {
            // we won't log on this time
            chai.request(server)
            .get('/auth/status')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the JSON response body should have a 
                // key-value pair of {"status": "good!"}
                res.body.status.should.eql('good!');
                // the JSON response body should have a 
                // key-value pair of {"loggedin": false}
                res.body.loggedin.should.eql(false);
                done();                        
            });
        });
    });

    // test logout
});