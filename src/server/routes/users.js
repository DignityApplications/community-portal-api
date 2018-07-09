// get our router and queries
const Router = require('koa-router');
const userQueries = require('../db/queries/users');
const roleQueries = require('../db/queries/roles');
const eventReservationQueries = require('../db/queries/event_reservations');
const relationshipQueries = require('../db/queries/relationships');

// bring in our body parser
const bodyParser = require('koa-body')({ 
    formidable:{
        uploadDir: './uploads/images', // where files will be uploaded 
        keepExtensions: true,
        maxFileSize: (5 * 1024 * 1024), // 5mb
        multiples: false, 
        onPart: (part) => {
            console.log(test);
            if(!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
                this.handlePart(part);
            } else {
                res.json({
                    status: 'no good :(',
                    message: 'That file type is invalid.'
                });
            }
        }
        },     
        multipart: true, 
        urlencoded: true 
    }
);

// bring in our helper functions
const permissions = require('./_permissionHelpers');

const router = new Router();
const BASE_URL = `/api/v1/users`;

// return all users
router.get(BASE_URL, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' of users
        // note: the lack of a third argument indicates that we want to see all types of users
        let canDo = await permissions.canDo(user, 'SeeAnyUser');
        if (canDo) {
            let opts = {sortBy: ctx.query.sortBy, sortDirection: ctx.query.sortDirection, 
                        searchFields: (ctx.query.searchFields) ? (ctx.query.searchFields).split(',') : ctx.query.searchFields, 
                        searchTerm: ctx.query.searchTerm, startsWithLetter: ctx.query.startsWithLetter, 
                        startsWithField: ctx.query.startsWithField};

            const users = await userQueries.getAllUsers(opts);
            ctx.body = {
                status: 'good!',
                data: users
            };
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };
        }
    } catch (err) {
        console.log(err);
    }
});

// return a single user
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        const userToSee = await userQueries.getSingleUser(ctx.params.id);
        if (userToSee.length) {
            // make sure the current user (or lack of user) can 'See' that type of user
            let userToSeeRole = (await roleQueries.getSingleRole(userToSee[0].role_id))[0].name;
            let canDo = false;
            if (user && user.id == ctx.params.id) // they are trying to see themselves
                canDo = await permissions.canDo(user, 'See', 'Self');
            else // they are trying to see another user
                canDo = await permissions.canDo(user, 'SeeAnyUser', String(userToSeeRole));

            if (canDo) {
                ctx.body = {
                    status: 'good!',
                    data: userToSee
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'no good :(',
                    message: 'User does not have the necessary permissions to perform this action.'
                };            
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'no good :(',
                message: 'That user does not exist.'
            };
        }
    } catch (err) {
        console.log(err);
    }
});

// create a new user
router.post(`${BASE_URL}`, bodyParser, async(ctx) => {
    try {
        let user = ctx.state.user || null;
        // we want to check if the current user can add this specific user role
        let newUserRole = (ctx.request.body.role_id) ? (await roleQueries.getSingleRole(ctx.request.body.role_id))[0] : '';

        // make sure the current user (or lack of user) can 'Add' users
        // note: the lack of a third argument indicates that we want to add all types of users
        let canDo = await permissions.canDo(user, 'AddUser', String(newUserRole.name));

        if (canDo) {
            if (ctx.request.body.fields && ctx.request.body.fields.fileObject)
                delete ctx.request.body.fields.fileObject;

            let formData = (ctx.request.body.fields) ? ctx.request.body.fields : ctx.request.body;

            if (ctx.request.body.files && ctx.request.body.files.fileObject)
                formData.avatar_path = String(ctx.request.body.files.fileObject.path).replace('uploads/', '/');
    
            const user = await userQueries.addUser(formData);
            if (user.length) {
                ctx.status = 201;
                ctx.body = {
                    status: 'good!',
                    data: user
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'no good :(',
                    message: 'Something went wrong.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };             
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred'
        };
    }
});

// update a user
router.put(`${BASE_URL}/:id`, bodyParser, async (ctx) => {
    try {
        let user = ctx.state.user || null;
        // we want to check if the current user can update this specific user role
        let userToUpdate = (await userQueries.getSingleUser(ctx.params.id))[0];
        let userToUpdateRole = (userToUpdate) ? (await roleQueries.getSingleRole(userToUpdate.role_id))[0].name : '';

        // make sure the current user (or lack of user) can 'Update' users
        // note: the lack of a third argument indicates that we want to update all types of users
        let canDo = false;
        if (user && user.id == ctx.params.id) // they are trying to update themselves
            canDo = await permissions.canDo(user, 'Update', 'Self');
        else // they are trying to update another user
            canDo = await permissions.canDo(user, 'UpdateAnyUser', String(userToUpdateRole));

        // let's also make sure that, if they are trying to change the user to another role, that the current 
        // user has the permissions to 'add' a user to the new role
        if (canDo && ctx.request.body.role_id) 
            canDo = await permissions.canDo(user, 'AddUser', (await roleQueries.getSingleRole(ctx.request.body.role_id))[0].name);

        if (canDo) {
            if (ctx.request.body.fields && ctx.request.body.fields.fileObject)
                delete ctx.request.body.fields.fileObject;

            let formData = (ctx.request.body.fields) ? ctx.request.body.fields : ctx.request.body;

            if (ctx.request.body.files && ctx.request.body.files.fileObject)
                formData.avatar_path = String(ctx.request.body.files.fileObject.path).replace('uploads/', '/');

            const user = await userQueries.updateUser(ctx.params.id, formData);
            if (user.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: user
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That user does not exist.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };    
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred'
        }
    }
});

// delete a user
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;
        // we want to check if the current user can delete this specific user role
        let userToDelete = (await userQueries.getSingleUser(ctx.params.id))[0];
        let userToDeleteRole = (userToDelete) ? (await roleQueries.getSingleRole(userToDelete.role_id))[0].name : '';

        // make sure the current user (or lack of user) can 'Delete' users
        // note: the lack of a third argument indicates that we want to delete all types of users
        let canDo = false;
        if (user && user.id == ctx.params.id) // they are trying to update themselves
            canDo = await permissions.canDo(user, 'Delete', 'Self');
        else // they are trying to see another user
            canDo = await permissions.canDo(user, 'DeleteAnyUser', userToDeleteRole);

        if (canDo) {
            const user = await userQueries.deleteUser(ctx.params.id);
            if (user.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: user
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That user does not exist.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };              
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})

// return all event reservations for a single user
router.get(`${BASE_URL}/:id/event_reservations`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // get the user that is being accessed
        const userToSee = await userQueries.getSingleUser(ctx.params.id);
 
        // make sure the user exists
        if (userToSee.length) {
            let canDo = false;
            if (user && user.id == userToSee[0].id) // they are trying to see their own event reservations
                canDo = await permissions.canDo(user, 'SeeOwn', 'EventReservations');
            else // they are trying to see another user's event reservations
                canDo = await permissions.canDo(user, 'SeeAll', 'EventReservations');

            if (canDo) {
                // get all of the event reservations for the given user
                const eventReservations = await eventReservationQueries.getEventReservationsByUser(ctx.params.id);
                ctx.body = {
                    status: 'good!',
                    data: eventReservations
                };                
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'no good :(',
                    message: 'User does not have the necessary permissions to perform this action.'
                };                 
            }   
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'no good :(',
                message: 'That user does not exist.'
            };            
        }
    } catch (err) {
        console.log(err);
    }
});

// return all relationships for a single user
router.get(`${BASE_URL}/:id/relationships`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // get the user that is being accessed
        const userToSee = await userQueries.getSingleUser(ctx.params.id);
    
        // make sure the user exists
        if (userToSee.length) {
            let canDo = false;

            // make sure the current user (or lack of user) can 'See' that type of user
            let userToSeeRole = (await roleQueries.getSingleRole(userToSee[0].role_id))[0].name;

            if (user && user.id == ctx.params.id) // they are trying to see themself
                canDo = await permissions.canDo(user, 'See', 'Self');
            else // they are trying to see another user
                canDo = await permissions.canDo(user, 'SeeAnyUser', String(userToSeeRole));

            if (canDo) {
                // get all of the relationships for the given user
                const relationships = await relationshipQueries.getRelationshipsByUser(ctx.params.id);

                ctx.body = {
                    status: 'good!',
                    data: relationships
                };                
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'no good :(',
                    message: 'User does not have the necessary permissions to perform this action.'
                };                 
            }   
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'no good :(',
                message: 'That user does not exist.'
            };            
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;