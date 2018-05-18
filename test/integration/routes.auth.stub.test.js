process.env.NODE_ENV = 'test';

const chai = require('chai');
const passport = require('koa-passport');
const should = chai.should();
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);

const server = require('../../src/server/index');
const knex = require('../../src/server/db/connection');
const queries = require('../../src/server/db/queries/users');
const helpers = require('../../src/server/routes/_helpers');

describe('routes : auth - stubbed', () => {

  beforeEach(() => {
    this.ensureAuthenticated = sinon.stub(
      helpers, 'ensureAuthenticated'
    ).returns(() => {});
    this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {});
    this.serialize = sinon.stub(passport, 'serializeUser').returns(() => {});
    this.deserialize = sinon.stub(passport, 'deserializeUser').returns(
      () => {});
  });

  afterEach(() => {
    this.authenticate.restore();
    this.serialize.restore();
    this.deserialize.restore();
    this.ensureAuthenticated.restore();
  });

  describe('POST /auth/login', () => {
    beforeEach(() => {
      this.authenticate.yields(null, { id: 1 });
      this.serialize.yields(null, { id: 1 });
      this.deserialize.yields(null, { id: 1 });
    });
    it('should login a user', (done) => {
      chai.request(server).keepOpen()
      .post('/auth/login')
      .send({
        email: 'testuser9023@gmail.com',
        password: 'thisisatest'
      })
      .end((err, res) => {
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
        done();
      });
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(() => {
      this.authenticate.yields(null, false);
    });
    it('should not login a user if the password is incorrect', (done) => {
      chai.request(server).keepOpen()
      .post('/auth/login')
      .send({
        username: 'testuser9023@gmail.com',
        password: 'notcorrect'
      })
      .end((err, res) => {
        // there should be a 400 status code
        res.status.should.eql(400);
        // the response should be JSON
        res.type.should.eql('application/json');
        // the JSON response body shuold have a 
        // key-value pair of {"status": "no good :("}
        res.body.status.should.eql('no good :(');
        // the JSON response body should have a 
        // key-value pair of {"message": "User authentication failed."}
        res.body.message.should.eql('User authentication failed.');
        done();
      });
    });
  });

});