// get our router and queries
const Router = require('koa-router');
const permissionQueries = require('../db/queries/permissions');

// bring in our helper functions
const permissions = require('./_permissionHelpers');

const router = new Router();
const BASE_URL = `/api/v1/permissions`;

// return all permissions
router.get(BASE_URL, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' all permissions
        let canDo = await permissions.canDo(user, 'See', 'Permissions');
        if (canDo) {
            const permissions = await permissionQueries.getAllPermissions();
            ctx.body = {
                status: 'good!',
                data: permissions
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

// return a single permission
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' permissions
        let canDo = false;
        canDo = await permissions.canDo(user, 'See', 'Permissions');

        if (canDo) {
            const permission = await permissionQueries.getSinglePermission(ctx.params.id);
            if (permission.length) {
                ctx.body = {
                    status: 'good!',
                    data: permission
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That permission does not exist.'
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

// create a new permission
router.post(`${BASE_URL}`, async(ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Add' permissions
        let canDo = await permissions.canDo(user, 'Add', 'Permissions');

        if (canDo) {
            const permission = await permissionQueries.addPermission(ctx.request.body);
            if (permission.length) {
                ctx.status = 201;
                ctx.body = {
                    status: 'good!',
                    data: permission
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

// update a permission
router.put(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Update' permissions
        let canDo = false;
        canDo = await permissions.canDo(user, 'Update', 'Permissions');

        if (canDo) {
            const permission = await permissionQueries.updatePermission(ctx.params.id, ctx.request.body);
            if (permission.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: permission
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That permission does not exist.'
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

// delete a permission
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Delete' permissions
        let canDo = false;
        canDo = await permissions.canDo(user, 'Delete', 'Permissions');

        if (canDo) {
            const permission = await permissionQueries.deletePermission(ctx.params.id);
            if (permission.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: permission
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That permission does not exist.'
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

module.exports = router;