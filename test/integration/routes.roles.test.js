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

// test our role CRUD routes
describe('routes : roles', () => {
    // we need a fresh instance of the database before each test is run
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => { return knex.migrate.latest(); })
        .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('GET /api/v1/roles', () => {
        it('should return all roles if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles')
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [6 objects]}
                    res.body.data.length.should.eql(6);
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

        it('should not return all roles if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles')
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

    describe('GET /api/v1/roles/:id', () => {
        it('should return a single role if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles/1')
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

        it('should not return a role if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles/1')
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

        it('should throw an error if the role does not exist', (done) => {
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
                return agent.get('/api/v1/roles/999999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That role does not exist."}
                    res.body.message.should.eql('That role does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('POST /api/v1/roles', () => {
        it('should return the role that was added if the current user has the necessary permissions', (done) => {
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
                return agent.post('/api/v1/roles')
                .send({
                    name: 'Wizard'        
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
                    // key-value pair of {"data": 1 role object}
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

        it('should not add the role if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.post('/api/v1/roles')
                .send({
                    name: 'Wizard'            
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
                .post('/api/v1/roles')
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

    describe('PUT /api/v1/roles/:id', () => {
        it('should return the role that was updated if the current user has the necessary permissions', (done) => {
            knex('roles')
            .select('*')
            .then((roles) => {
                const roleObject = roles[0];
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
                    .put(`/api/v1/roles/${roleObject.id}`)
                    .send({
                        name: 'Mega-Wizard'
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
                        // key-value pair of {"data": 1 role object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should 
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'name' 
                        );
                        // the password should be different due to hashing
                        res.body.data[0].should.not.eql('test9876');
                        // ensure the role was in fact updated
                        const newRoleObject = res.body.data[0];
                        newRoleObject.name.should.not.eql(roleObject.name);
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            done();   
                        }); 
                    });
                });
            });
        });

        it('should not update the role if the current user doesn\'t have the necessary permissions', (done) => {
            knex('roles')
            .select('*')
            .then((roles) => {
                const roleObject = roles[0];
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
                    .put(`/api/v1/roles/${roleObject.id}`)
                    .send({
                        name: 'Mega-Wizard'
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

        it('should throw an error if the role does not exist', (done) => {
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
                .put('/api/v1/roles/9999999')
                .send({
                    name: 'Mega-Wizard'
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
                    // key-value pair of {"message": "That role does not exist."}
                    res.body.message.should.eql('That role does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });
    });

    describe('DELETE /api/v1/roles/:id', () => {
        it('should return the role that was deleted if the current user has the necessary permissions', (done) => {
            knex('roles')
            .select('*') // no users are assigned this role
            .then((roles) => {
                const roleObject = roles[roles.length - 1];
                const lengthBeforeDelete = roles.length;
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
                    .delete(`/api/v1/roles/${roleObject.id}`)
                    .end((err, res) => {
                        // there should be a 200 status code
                        res.status.should.equal(200);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "good!"}
                        res.body.status.should.eql('good!');
                        // the JSON response body should have a 
                        // key-value pair of {"data": 1 role object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'name'
                        );
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            // ensure that the role was in fact deleted
                            knex('roles').select('*')
                            .then((updatedRoles) => {
                                updatedRoles.length.should.eql(lengthBeforeDelete - 1);
                                done();
                            }); 
                        });
                    });
                });
            });
        });

        it('should not delete the role if the current user doesn\'t have the necessary permissions', (done) => {
            knex('roles')
            .select('*')
            .then((roles) => {
                const roleObject = roles[1];
                const lengthBeforeDelete = roles.length;
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
                    .delete(`/api/v1/roles/${roleObject.id}`)
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

        it('should throw an error if the role does not exist', (done) => {
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
                .delete('/api/v1/roles/9999999')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That role does not exist."}
                    res.body.message.should.eql('That role does not exist.');
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
                .delete('/api/v1/roles/4')
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

    // test our /roles/:id/permissions routes (CRD)
    describe('GET /api/v1/roles/:id/permissions', () => {
        it('should return all permissions of a given role if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles/4/permissions')
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [44 objects]}
                    res.body.data.length.should.eql(44);
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

        it('should not return all permissions of a given role if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles/4/permissions')
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
        
        it('should throw an error if the role does not exist', (done) => {
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
                return agent.get('/api/v1/roles/999999999/permissions')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That role does not exist."}
                    res.body.message.should.eql('That role does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });

    describe('POST /api/v1/roles/:id/permissions', () => {
        it('should return the roles_permissions junction that was added if the current user has the necessary permissions', (done) => {
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
                return agent.post('/api/v1/roles/4/permissions')
                .send({
                    permission_id: 1       
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
                    // key-value pair of {"data": 1 role object}
                    res.body.data.length.should.eql(1);
                    // the first object in the data array should
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'permission_id', 'role_id'
                    );
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });

        it('should not add the roles_permission junction if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.post('/api/v1/roles/4/permissions')
                .send({
                    permission_id: 1          
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
                .post('/api/v1/roles/4/permissions')
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

    describe('DELETE /api/v1/roles/:id/permission', () => {
        it('should return the roles_permissions junction that was removed if the current user has the necessary permissions', (done) => {
            knex('roles_permissions')
            .select('*')
            .then((roles_permissions) => {
                const roles_permissionObject = roles_permissions[1];
                const lengthBeforeDelete = roles_permissions.length;
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
                    .delete(`/api/v1/roles/${roles_permissionObject.role_id}/permissions/${roles_permissionObject.permission_id}`)
                    .end((err, res) => {
                        // there should be a 200 status code
                        res.status.should.equal(200);
                        // the response should be JSON
                        res.type.should.equal('application/json');
                        // the JSON response body should have a 
                        // key-value pair of {"status": "good!"}
                        res.body.status.should.eql('good!');
                        // the JSON response body should have a 
                        // key-value pair of {"data": 1 roles_permissions object}
                        res.body.data.length.should.eql(1);
                        // the first object in the data array should
                        // have the right keys
                        res.body.data[0].should.include.keys(
                            'id', 'role_id', 'permission_id'
                        );
                        return agent.get('/auth/logout')
                        .end((err, res) => {
                            // ensure that the role was in fact deleted
                            knex('roles_permissions').select('*')
                            .then((updatedRoles_Permissions) => {
                                updatedRoles_Permissions.length.should.eql(lengthBeforeDelete - 1);
                                done();
                            }); 
                        });
                    });
                });
            });
        });

        it('should not delete the role_permission junction if the current user doesn\'t have the necessary permissions', (done) => {
            knex('roles_permissions')
            .select('*')
            .then((roles_permissions) => {
                const roles_permissionObject = roles_permissions[1];
                const lengthBeforeDelete = roles_permissions.length;
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
                    .delete(`/api/v1/roles/${roles_permissionObject.role_id}/permissions/${roles_permissionObject.permission_id}`)
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

        it('should throw an error if the role does not exist', (done) => {
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
                .delete('/api/v1/roles/9999999/permissions/1')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That role does not exist."}
                    res.body.message.should.eql('That role does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    });
                });
            });
        });
    });

    // GET all users of a given role
    describe('GET /api/v1/roles/:id/users', () => {
        it('should return all users of a given role if the current user has the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles/4/users') // WebAdmins
                .end((err, res) => {
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"status": "good!"}
                    res.body.status.should.eql('good!');
                    // the JSON response body should have a  
                    // key-value pair of {"data": [2 objects]}
                    res.body.data.length.should.eql(2);
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

        it('should not return all users of a given role if the current user doesn\'t have the necessary permissions', (done) => {
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
                return agent.get('/api/v1/roles/4/users') // WebAdmins
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
        
        it('should throw an error if the role does not exist', (done) => {
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
                return agent.get('/api/v1/roles/999999999/users')
                .end((err, res) => {
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "no good :("}
                    res.body.status.should.eql('no good :(');
                    // the JSON response body should have a 
                    // key-value pair of {"message": "That role does not exist."}
                    res.body.message.should.eql('That role does not exist.');
                    return agent.get('/auth/logout')
                    .end((err, res) => {
                        done();   
                    }); 
                });
            });
        });
    });
});