// get our router and queries
const Router = require('koa-router');
const relationshipQueries = require('../db/queries/relationships');
const userQueries = require('../db/queries/users');
const roleQueries = require('../db/queries/roles');

// bring in our helper functions
const permissions = require('./_permissionHelpers');

// bring in our body parser
const bodyParser = require('koa-body');

const router = new Router();
const BASE_URL = `/api/v1/relationships`;

// create a new relationship
router.post(`${BASE_URL}`, bodyParser(), async(ctx) => {
    try {
        let user = ctx.state.user || null;

        let canDo = false;
        // let's assume that if the user can edit the user they are currently adding a relationship for, 
        // they have the necessary permissions to add the relationship
        const userToAddRelationshipTo = await userQueries.getSingleUser(ctx.request.body.user1);
        const userToAddRelationshipToRole = (await roleQueries.getSingleRole(userToAddRelationshipTo[0].role_id))[0].name;

        if (user && user.id == userToAddRelationshipTo.id) // they are trying to add a relationship for themselves
            canDo = await permissions.canDo(user, 'Update', 'Self');
        else // they are trying to add a relationship for another user
            canDo = await permissions.canDo(user, 'UpdateAnyUser', String(userToAddRelationshipToRole));

        if (canDo) {
            const relationship = await relationshipQueries.addRelationship(ctx.request.body);
            if (relationship.length) {
                ctx.status = 201;
                ctx.body = {
                    status: 'good!',
                    data: relationship
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

// delete a relationship
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        const relationshipToDelete = await relationshipQueries.getSingleRelationship(ctx.params.id);
        if (relationshipToDelete.length) {
            let canDo = false;
            // let's assume that if the user can edit the user they are currently removing a relationship from, 
            // they have the necessary permissions to remove the relationship
            const userToRemoveRelationshipFrom = await userQueries.getSingleUser(relationshipToDelete[0].user1);
            const userToRemoveRelationshipFromRole = (await roleQueries.getSingleRole(userToRemoveRelationshipFrom[0].role_id))[0].name;

            if (user && user.id == userToRemoveRelationshipFrom.id) // they are trying to remove their own relationship
                canDo = await permissions.canDo(user, 'Update', 'Self');
            else // they are trying to remove a relationship from another user
            canDo = await permissions.canDo(user, 'UpdateAnyUser', String(userToRemoveRelationshipFromRole));

            if (canDo) {
                const relationship = await relationshipQueries.deleteRelationship(ctx.params.id);
                ctx.body = {
                    status: 'good!',
                    data: relationship
                }
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
                message: 'That relationship does not exist.'
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