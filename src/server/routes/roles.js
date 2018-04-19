// get our router and queries
const Router = require('koa-router');
const roleQueries = require('../db/queries/roles');
const permissionQueries = require('../db/queries/permissions');

// bring in our helper functions
const permissions = require('./_permissionHelpers');

const router = new Router();
const BASE_URL = `/api/v1/roles`;

// return all roles
router.get(BASE_URL, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' all roles
        let canDo = await permissions.canDo(user, 'See', 'Roles');
        if (canDo) {
            const roles = await roleQueries.getAllRoles();
            ctx.body = {
                status: 'good!',
                data: roles
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

// return a single role
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' roles
        let canDo = false;
        canDo = await permissions.canDo(user, 'See', 'Roles');

        if (canDo) {
            const role = await roleQueries.getSingleRole(ctx.params.id);
            if (role.length) {
                ctx.body = {
                    status: 'good!',
                    data: role
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That role does not exist.'
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
        console.log(err);
    }
});

// create a new role
router.post(`${BASE_URL}`, async(ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Add' roles
        let canDo = await permissions.canDo(user, 'Add', 'Roles');

        if (canDo) {
            const role = await roleQueries.addRole(ctx.request.body);
            if (role.length) {
                ctx.status = 201;
                ctx.body = {
                    status: 'good!',
                    data: role
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

// update a role
router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Update' roles
        let canDo = false;
        canDo = await permissions.canDo(user, 'Update', 'Roles');

        if (canDo) {
            const role = await roleQueries.updateRole(ctx.params.id, ctx.request.body);
            if (role.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: role
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That role does not exist.'
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

// delete a role
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Delete' roles
        let canDo = false;
        canDo = await permissions.canDo(user, 'Delete', 'Roles');

        if (canDo) {
            const role = await roleQueries.deleteRole(ctx.params.id);
            if (role.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: role
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That role does not exist.'
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

// return all permissions for a single role
router.get(`${BASE_URL}/:id/permissions`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' roles and 
        // can see permissions
        let canDo = false;
        canDo = ((await permissions.canDo(user, 'See', 'Roles') && 
            (await permissions.canDo(user, 'See', 'Permissions'))));

        if (canDo) {
            const role = await roleQueries.getSingleRole(ctx.params.id);
            if (role.length) {
                // get all of the permissions for the given role
                const permissions = await permissionQueries.getPermissionsByRole(ctx.params.id);
                ctx.body = {
                    status: 'good!',
                    data: permissions
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That role does not exist.'
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
        console.log(err);
    }
});

module.exports = router;