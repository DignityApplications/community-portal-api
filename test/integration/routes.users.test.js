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

// test our user CRUD routes
describe('routes : users', () => {
    // we need a fresh instance of the database before each test is run
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => { return knex.migrate.latest(); })
        .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('GET /api/v1/users', () => {
        it('should return all users if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users')
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [4 objects]}
                    res.body.data.length.should.eql(4);
                    // the first object in the data array should 
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'email', 'first_name', 'last_name', 
                        'date_of_birth', 'home_phone_number', 'cell_phone_number',
                        'current_address', 'previous_address', 'avatar_path', 'bio', 
                        'role_id', 'created_at', 'updated_at' 
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return all users if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users')
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

    describe('GET /api/v1/users/:id', () => {
        it('should return a single user if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users/1')
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
                        'id', 'email', 'first_name', 'last_name', 
                        'date_of_birth', 'home_phone_number', 'cell_phone_number',
                        'current_address', 'previous_address', 'avatar_path', 'bio', 
                        'role_id', 'created_at', 'updated_at' 
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return a user if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users/1')
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

        it('should throw an error if the user does not exist', (done) => {
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
                return agent.get('/api/v1/users/999999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That user does not exist."}
                    res.body.message.should.eql('That user does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('POST /api/v1/users', () => {
        it('should return the user that was added if the current user has the necessary permissions', (done) => {
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
                return agent.post('/api/v1/users')
                .send({
                    email: 'dignityapps@gmail.com',
                    password: 'test9876',
                    first_name: 'Dignity',
                    last_name: 'Applications',
                    date_of_birth: '10/01/1990',
                    home_phone_number: '704-885-8342',
                    cell_phone_number: '704-111-3357',
                    current_address: '1234 Test St., Wilmington NC 28412',
                    previous_address: '4321 Test Rd., Testville NC 28110',
                    avatar_path: '/images/avatars/DignityApps.jpg',
                    bio: 'BEST COMPANY EVER.',
                    role_id: 1            
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
                    // key-value pair of {"data": 1 user object}
                    res.body.data.length.should.eql(1);
                    // the first object in the data array should
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'email', 'first_name', 'last_name', 
                        'date_of_birth', 'home_phone_number', 'cell_phone_number',
                        'current_address', 'previous_address', 'avatar_path', 'bio', 
                        'role_id', 'created_at', 'updated_at' 
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not add the user if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.post('/api/v1/users')
                .send({
                    email: 'dignityapps@gmail.com',
                    password: 'test9876',
                    first_name: 'Dignity',
                    last_name: 'Applications',
                    date_of_birth: '10/01/1990',
                    home_phone_number: '704-885-8342',
                    cell_phone_number: '704-111-3357',
                    current_address: '1234 Test St., Wilmington NC 28412',
                    previous_address: '4321 Test Rd., Testville NC 28110',
                    avatar_path: '/images/avatars/DignityApps.jpg',
                    bio: 'BEST COMPANY EVER.',
                    role_id: 1            
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
                .post('/api/v1/users')
                .send({
                    password: 'test4321',
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

        it('should throw an error if the email is already in use', (done) => {
            knex('users')
            .select('*')
            .then((users) => {
                const userObject = users[0];
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
                    .post('/api/v1/users')
                    .send({
                        email: userObject.email,
                        password: 'test9876',
                        first_name: 'Dignity',
                        last_name: 'Applications',
                        date_of_birth: '10/01/1990',
                        home_phone_number: '704-885-8342',
                        cell_phone_number: '704-111-3357',
                        current_address: '1234 Test St., Wilmington NC 28412',
                        previous_address: '4321 Test Rd., Testville NC 28110',
                        avatar_path: '/images/avatars/DignityApps.jpg',
                        bio: 'BEST COMPANY EVER.',
                        role_id: '1' 
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
        });

    });

    describe('PUT /api/v1/users/:id', () => {
        it('should return the user that was updated if the current user has the necessary permissions', (done) => {
            knex('users')
            .select('*')
            .then((users) => {
                const userObject = users[0];
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
                    .put(`/api/v1/users/${userObject.id}`)
                    .send({
                        first_name: 'Jerry',
                        password: 'test9876',
                        role_id: 1 // change to a member
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
                        // key-value pair of {"data": 1 user object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should 
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'email', 'first_name', 'last_name', 
                            'date_of_birth', 'home_phone_number', 'cell_phone_number',
                            'current_address', 'previous_address', 'avatar_path', 'bio', 
                            'role_id', 'created_at', 'updated_at' 
                        );
                        // the password should be different due to hashing
                        res.body.data[0].should.not.eql('test9876');
                        // ensure the user was in fact updated
                        const newUserObject = res.body.data[0];
                        newUserObject.first_name.should.not.eql(userObject.first_name);
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });

        it('should not update the user if the current user doesn\'t have the necessary permissions', (done) => {
            knex('users')
            .select('*')
            .then((users) => {
                const userObject = users[0];
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
                    .put(`/api/v1/users/${userObject.id}`)
                    .send({
                        first_name: 'Jerry',
                        password: 'test9876',
                        role_id: 1 // attempt to change to a member
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

        it('should throw an error if the user does not exist', (done) => {
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
                .put('/api/v1/users/9999999')
                .send({
                    first_name: 'Jerry'
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
                    // key-value pair of {"message": "That user does not exist."}
                    res.body.message.should.eql('That user does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });

        it('should throw an error if the email is already in use', (done) => {
            knex('users')
            .select('*')
            .then((users) => {
                const firstUserObject = users[0];
                const secondUserObject = users[1];
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
                    .put(`/api/v1/users/${firstUserObject.id}`)
                    .send({
                        email: secondUserObject.email
                    })
                    .end((err, res) => {
                        // there should be a 400 status 
                        res.status.should.equal(400);
                        // the resopnse should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "no good :("}
                        res.body.status.should.eql('no good :(');
                        // the JSON response body should have a 
                        // key-value pair of {"message": Error message}
                        should.exist(res.body.message);
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        });
                    });
                })
            });
        });
    });

    describe('DELETE /api/v1/users/:id', () => {
        it('should return the user that was deleted if the current user has the necessary permissions', (done) => {
            knex('users')
            .select('*')
            .then((users) => {
                const userObject = users[users.length - 1];
                const lengthBeforeDelete = users.length;
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
                    .delete(`/api/v1/users/${userObject.id}`)
                    .end((err, res) => {
                        // there should be a 200 status code
                        res.status.should.equal(200);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "good!"}
                        res.body.status.should.eql('good!');
                        // the JSON response body should have a 
                        // key-value pair of {"data": 1 user object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'email', 'first_name', 'last_name', 
                            'date_of_birth', 'home_phone_number', 'cell_phone_number',
                            'current_address', 'previous_address', 'avatar_path', 'bio', 
                            'role_id', 'created_at', 'updated_at' 
                        );
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            // ensure that the user was in fact deleted
                            knex('users').select('*')
                            .then((updatedUsers) => {
                                updatedUsers.length.should.eql(lengthBeforeDelete - 1);
                                done();
                            }); 
                        });
                    });
                });
            });
        });

        it('should not delete the user if the current user doesn\'t have the necessary permissions', (done) => {
            knex('users')
            .select('*')
            .then((users) => {
                const userObject = users[1];
                const lengthBeforeDelete = users.length;
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
                    .delete(`/api/v1/users/${userObject.id}`)
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

        it('should throw an error if the user does not exist', (done) => {
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
                .delete('/api/v1/users/9999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That user does not exist."}
                    res.body.message.should.eql('That user does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });

        it('should throw an error if there is a foreign key constraint violation', (done) => {
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
                .delete('/api/v1/users/1')
                .end((err, res) => {
                    // there should be a 400 status code
                    res.status.should.equal(400);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": String object with keywords 'foreign key'}
                    res.body.message.should.have.string('foreign key');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });
    });

    // test our /users/:id/event_reservations routes (R)
    describe('GET /api/v1/users/:id/event_reservations', () => {
        it('should return all event reservations for a given user if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users/1/event_reservations')
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

        it('should not return all event reservations for the given user if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users/1/event_reservations')
                .end((err, res) => {
                    // there should be a 401 status code
                    res.status.should.equal(401);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
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

    // test our /users/:id/relationships routes (R)
    describe('GET /api/v1/users/:id/relationships', () => {
        it('should return all relationships for a given user if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users/1/relationships')
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
                        'id', 'user1', 'user2_first_name', 'user2_last_name', 'relationship'
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return all relationships for the given user if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/users/1/relationships')
                .end((err, res) => {
                    // there should be a 401 status code
                    res.status.should.equal(401);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
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
});