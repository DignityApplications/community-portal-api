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
const moment = require('moment');
chai.use(chaiHttp);

// test our event_reservations CRUD routes
describe('routes : event_reservations', () => {
    // we need a fresh instance of the database before each test is run
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => { return knex.migrate.latest(); })
        .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('GET /api/v1/event_reservations', () => {
        it('should return all event reservations if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/event_reservations')
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [3 objects]}
                    res.body.data.length.should.eql(3);
                    // the first object in the data array should 
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'user_id', 'event_id', 'attendees', 
                        'created_at', 'updated_at'
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return all event reservations if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/event_reservations')
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
                    res.body.message.should.eql('User does not have the necessary permissions to perform this action.')
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('GET /api/v1/event_reservations/:id', () => {
        it('should return a single event reservation if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/event_reservations/1')
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [1 objects]}
                    res.body.data.length.should.eql(1);
                    // the first object in the data array should 
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'user', 'event', 'attendees', 
                        'created_at', 'updated_at' 
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return an event reservation if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/event_reservations/1')
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

        it('should throw an error if the event reservation does not exist', (done) => {
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
                return agent.get('/api/v1/event_reservations/999999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That event reservation does not exist."}
                    res.body.message.should.eql('That event reservation does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('POST /api/v1/event_reservations', () => {
        it('should return the event reservation that was added if the current user has the necessary permissions', (done) => {
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
                return agent.post('/api/v1/event_reservations')
                .send({
                    user_id: 1,
                    event_id: 2,
                    attendees: 3,      
                })
                .end((err, res) => {
                    // there should be a 201 status code
                    // indicating that something was created
                    res.status.should.equal(201);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a 
                    // key-value pair of {"data": 1 event reservation object}
                    res.body.data.length.should.eql(1);
                    // the first object in the data array should
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'user_id', 'event_id', 'attendees', 
                        'created_at', 'updated_at' 
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not add the event reservation if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.post('/api/v1/event_reservations')
                .send({
                    user_id: 1,
                    event_id: 1,
                    attendees: 3,            
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

        it('should throw an error if the payload is malformed', (done) => {
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
                .post('/api/v1/event_reservations')
                .send({
                    test: 'not sending the right payload!'
                })
                .end((err, res) => {
                    // there should be a 400 status code
                    res.status.should.equal(400);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a message key
                    should.exist(res.body.message);
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not create the event reservation if the reservation limit is exceeded', (done) => {
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
                return agent.post('/api/v1/event_reservations')
                .send({
                    user_id: 1,
                    event_id: 1,
                    attendees: 22,      
                })
                .end((err, res) => {
                    // there should be a 409 status code
                    res.status.should.equal(409);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message", "The reservation limit has been exceeded, therefore this reservation can not be made."}
                    res.body.message.should.eql('The reservation limit has been exceeded, therefore this reservation can not be made.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('PUT /api/v1/event_reservations/:id', () => {
        it('should return the event reservation that was updated if the current user has the necessary permissions', (done) => {
            knex('event_reservations')
            .select('*')
            .then((event_reservations) => {
                const eventReservationObject = event_reservations[0];
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
                    .put(`/api/v1/event_reservations/${eventReservationObject.id}`)
                    .send({
                        attendees: 1
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
                        // key-value pair of {"data": 1 event_reservation object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should 
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'user_id', 'event_id', 'attendees', 
                            'created_at', 'updated_at' 
                        );
                        // ensure the event reservation was in fact updated
                        const newEventReservationObject = res.body.data[0];
                        newEventReservationObject.attendees.should.not.eql(eventReservationObject.attendees);
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });

        it('should not update the event reservation if the current user doesn\'t have the necessary permissions', (done) => {
            knex('event_reservations')
            .select('*')
            .then((event_reservations) => {
                const eventReservationObject = event_reservations[0];
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
                    .put(`/api/v1/event_reservations/${eventReservationObject.id}`)
                    .send({
                        attendees: 4
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

        it('should throw an error if the event reservation does not exist', (done) => {
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
                .put('/api/v1/event_reservations/9999999')
                .send({
                    attendees: 4
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
                    // key-value pair of {"message": "That event reservation does not exist."}
                    res.body.message.should.eql('That event reservation does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });

        it('should not update the event reservation if the reservation limit is exceeded', (done) => {
            knex('event_reservations')
            .select('*')
            .then((event_reservations) => {
                const eventReservationObject = event_reservations[0];
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
                    .put(`/api/v1/event_reservations/${eventReservationObject.id}`)
                    .send({
                        attendees: 25
                    })
                    .end((err, res) => {
                        // there should be a 409 status code
                        res.status.should.equal(409);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "no good :("}
                        res.body.status.should.eql('no good :(');
                        // the JSON response body should have a 
                        // key-value pair of {"message", "The reservation limit has been exceeded, therefore this reservation can not be made."}
                        res.body.message.should.eql('The reservation limit has been exceeded, therefore this reservation can not be made.');
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });
    });

    describe('DELETE /api/v1/event_reservations/:id', () => {
        it('should return the event reservation that was deleted if the current user has the necessary permissions', (done) => {
            knex('event_reservations')
            .select('*')
            .then((event_reservations) => {
                const eventReservationObject = event_reservations[1];
                const lengthBeforeDelete = event_reservations.length;
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
                    .delete(`/api/v1/event_reservations/${eventReservationObject.id}`)
                    .end((err, res) => {
                        // there should be a 200 status code
                        res.status.should.equal(200);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "good!"}
                        res.body.status.should.eql('good!');
                        // the JSON response body should have a 
                        // key-value pair of {"data": 1 event reservation object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'user_id', 'event_id', 'attendees', 
                            'created_at', 'updated_at'
                        );
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            // ensure that the event reservation was in fact deleted
                            knex('event_reservations').select('*')
                            .then((updatedEventReservations) => {
                                updatedEventReservations.length.should.eql(lengthBeforeDelete - 1);
                                done();
                            }); 
                        });
                    });
                });
            });
        });

        it('should not delete the event reservation if the current user doesn\'t have the necessary permissions', (done) => {
            knex('event_reservations')
            .select('*')
            .then((eventReservations) => {
                const eventReservationObject = eventReservations[1];
                const lengthBeforeDelete = eventReservations.length;
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
                    .delete(`/api/v1/event_reservations/${eventReservationObject.id}`)
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

        it('should throw an error if the event reservation does not exist', (done) => {
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
                .delete('/api/v1/event_reservations/9999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That event reservation does not exist."}
                    res.body.message.should.eql('That event reservation does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });
    });
});