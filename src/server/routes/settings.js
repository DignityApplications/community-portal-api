// get our router and queries
const Router = require('koa-router');
const settingsQueries = require('../db/queries/settings');

// bring in our helper functions
const permissions = require('./_permissionHelpers');

// bring in our body parser
const bodyParser = require('koa-body');

const router = new Router();
const BASE_URL = `/api/v1/settings`;

// return the single settings record
router.get(BASE_URL, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        const settings = await settingsQueries.getSettings();
        
        ctx.body = {
            status: 'good!',
            data: settings
        };
    } catch (err) {
        console.log(err);
    }
});

// update the settings record
router.put(`${BASE_URL}/:id`, bodyParser(), async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Update' the settings
        let canDo = false;
        canDo = await permissions.canDo(user, 'Update', 'Settings');

        if (canDo) {
            const settings = await settingsQueries.updateSettings(ctx.params.id, ctx.request.body);
            if (settings.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: settings
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That settings record does not exist.'
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

module.exports = router;