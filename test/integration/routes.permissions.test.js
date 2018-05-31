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

// test our permissions CRUD routes
describe('routes : permissions', () => {
    // we need a fresh instance of the database before each test is run
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => { return knex.migrate.latest(); })
        .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('GET /api/v1/permissions', () => {
        it('should return all permissions if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/permissions')
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [36 objects]}
                    res.body.data.length.should.eql(36);
                    // the first object in the data array should 
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'name'
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return all permissions if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/permissions')
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

    describe('GET /api/v1/permissions/:id', () => {
        it('should return a single permission if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/permissions/1')
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
                        'id', 'name' 
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not return a permission if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/permissions/1')
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

        it('should throw an error if the permission does not exist', (done) => {
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
                return agent.get('/api/v1/permissions/999999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That permission does not exist."}
                    res.body.message.should.eql('That permission does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('POST /api/v1/permissions', () => {
        it('should return the permission that was added if the current user has the necessary permissions', (done) => {
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
                return agent.post('/api/v1/permissions')
                .send({
                    name: 'CanDoEverything'        
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
                    // key-value pair of {"data": 1 permission object}
                    res.body.data.length.should.eql(1);
                    // the first object in the data array should
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'name'
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not add the permission if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.post('/api/v1/permissions')
                .send({
                    name: 'CanDoEverything'            
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
                .post('/api/v1/permissions')
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
    });

    describe('PUT /api/v1/permissions/:id', () => {
        it('should return the permission that was updated if the current user has the necessary permissions', (done) => {
            knex('permissions')
            .select('*')
            .then((permissions) => {
                const permissionObject = permissions[0];
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
                    .put(`/api/v1/permissions/${permissionObject.id}`)
                    .send({
                        name: 'CanDoEverything'
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
                        // key-value pair of {"data": 1 permission object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should 
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'name' 
                        );
                        // the password should be different due to hashing
                        res.body.data[0].should.not.eql('test9876');
                        // ensure the permission was in fact updated
                        const newPermissionObject = res.body.data[0];
                        newPermissionObject.name.should.not.eql(permissionObject.name);
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });

        it('should not update the permission if the current user doesn\'t have the necessary permissions', (done) => {
            knex('permissions')
            .select('*')
            .then((permissions) => {
                const permissionObject = permissions[0];
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
                    .put(`/api/v1/permissions/${permissionObject.id}`)
                    .send({
                        name: 'CanDoEverything'
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

        it('should throw an error if the permission does not exist', (done) => {
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
                .put('/api/v1/permissions/9999999')
                .send({
                    name: 'CanDoEverything'
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
                    // key-value pair of {"message": "That permission does not exist."}
                    res.body.message.should.eql('That permission does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });
    });

    describe('DELETE /api/v1/permissions/:id', () => {
        it('should return the permission that was deleted if the current user has the necessary permissions', (done) => {
            knex('permissions')
            .select('*')
            .then((permissions) => {
                const permissionObject = permissions[permissions.length - 1];
                const lengthBeforeDelete = permissions.length;
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
                    .delete(`/api/v1/permissions/${permissionObject.id}`)
                    .end((err, res) => {
                        // there should be a 200 status code
                        res.status.should.equal(200);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "good!"}
                        res.body.status.should.eql('good!');
                        // the JSON response body should have a 
                        // key-value pair of {"data": 1 permission object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'name'
                        );
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            // ensure that the permission was in fact deleted
                            knex('permissions').select('*')
                            .then((updatedPermissions) => {
                                updatedPermissions.length.should.eql(lengthBeforeDelete - 1);
                                done();
                            }); 
                        });
                    });
                });
            });
        });

        it('should not delete the permission if the current user doesn\'t have the necessary permissions', (done) => {
            knex('permissions')
            .select('*')
            .then((permissions) => {
                const permissionObject = permissions[1];
                const lengthBeforeDelete = permissions.length;
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
                    .delete(`/api/v1/permissions/${permissionObject.id}`)
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

        it('should throw an error if the permission does not exist', (done) => {
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
                .delete('/api/v1/permissions/9999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That permission does not exist."}
                    res.body.message.should.eql('That permission does not exist.');
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
                .delete('/api/v1/permissions/1')
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
    
});