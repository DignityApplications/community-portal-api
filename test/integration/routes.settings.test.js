process.env.NODE_ENV = 'test';

// bring in our Koa web server and database connection
const server = require('../../src/server/index');
const knex = require('../../src/server/db/connection');

// bring in node modules and chai assertion libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const agent = chai.request.agent(server);
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// test our settings RUD routes (no create routes, as there should only be one record)
describe('routes : settings', () => {
    // we need a fresh instance of the database before each test is run
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => { return knex.migrate.latest(); })
        .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('GET /api/v1/settings', () => {
        it('should return the settings record', (done) => {
            agent.get('/api/v1/settings')
            .end((err, res) => {
                // there should be a 200 status code
                res.status.should.equal(200);
                // the response should be JSON
                res.type.should.equal('application/json');
                // the JSON response body should have a 
                // key-value pair of {"status": "good!"}
                res.body.status.should.eql('good!');
                // the JSON response body should have a  
                // key-value pair of {"data": [1 object]}
                res.body.data.length.should.eql(1);
                // the first object in the data array should 
                // have the right keys
                res.body.data[0].should.include.keys(
                    'id', 'community_name', 'address', 'city', 'state', 
                    'zip', 'site_color', 'installed',
                    'created_at', 'updated_at'
                );
                return agent.get('/auth/logout')
                .end((err, res) => {
                    done();   
                }); 
            });
        });

        // we do not need to test permissions for getting settings, as anyone 
        // should be able to see basic community settings, even visitors who 
        // are not logged in
    });

    describe('PUT /api/v1/settings/:id', () => {
        it('should return the settings record that was updated if the current user has the necessary permissions', (done) => {
            knex('settings')
            .select('*')
            .then((settings) => {
                const settingsObject = settings[0];
                // first we need to log on
                agent
                .post('/auth/login')
                .send({
                    email: 'elliotsminion@gmail.com',
                    password: 'test1234'
                })
                .end((err, res) => {
                    // expect the response to contain a session cookie
                    expect(res).to.have.cookie('koa:sess');
                    agent
                    .put(`/api/v1/settings/${settingsObject.id}`)
                    .send({
                        community_name: 'Living in Wisdom'
                    })
                    .end((err, res) => {
                        // there should be a 200 status code
                        res.status.should.equal(200);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status", "good!"}
                        res.body.status.should.eql('good!');
                        // the JSON response body should have a 
                        // key-value pair of {"data": 1 settings object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should 
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'community_name', 'address', 'city', 'state', 
                            'zip', 'site_color', 'installed',
                            'created_at', 'updated_at'
                        );
                        // ensure the settings record was in fact updated
                        const newSettingsObject = res.body.data[0];
                        newSettingsObject.community_name.should.not.eql(settingsObject.community_name);
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });

        it('should not update the settings record if the current user doesn\'t have the necessary permissions', (done) => {
            knex('settings')
            .select('*')
            .then((settings) => {
                const settingsObject = settings[0];
                // first we need to log on
                agent
                .post('/auth/login')
                .send({
                    email: 'fakeuser@gmail.com',
                    password: 'test9876'
                })
                .end((err, res) => {
                    // expect the response to contain a session cookie
                    expect(res).to.have.cookie('koa:sess');
                    agent
                    .put(`/api/v1/settings/${settingsObject.id}`)
                    .send({
                        community_name: 'Living in Wisdom'
                    })
                    .end((err, res) => {
                        // there should be a 401 status code
                        res.status.should.equal(401);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "good!"}
                        res.body.status.should.eql('no good :(');
                        // the JSON response body should have a 
                        // key-value pair of {"message", "User does not have the necessary permissions to perform this action."}
                        res.body.message.should.eql('User does not have the necessary permissions to perform this action.');
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });

        it('should throw an error if the settings record does not exist', (done) => {
            // first we need to log on
            agent
            .post('/auth/login')
            .send({
                email: 'elliotsminion@gmail.com',
                password: 'test1234'
            })
            .end((err, res) => {
                // expect the response to contain a session cookie
                expect(res).to.have.cookie('koa:sess');
                agent
                .put('/api/v1/settings/9999999')
                .send({
                    community_name: 'Living in Wisdom'
                })
                .end((err, res) => {
                    // there should be a 404 status 
                    res.status.should.equal(404);
                    // the resopnse should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That settings record does not exist."}
                    res.body.message.should.eql('That settings record does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });
    });
});