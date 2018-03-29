// get our router and queries
const Router = require('koa-router');
const queries = require('../db/queries/users');

const router = new Router();
const BASE_URL = `/api/v1/users`;

// return all users
router.get(BASE_URL, async (ctx) => {
    try {
        const users = await queries.getAllUsers();
        ctx.body = {
            status: 'good!',
            data: users
        };
    } catch (err) {
        console.log(err);
    }
});

// return a single user
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const user = await queries.getSingleUser(ctx.params.id);
        if (user.length) {
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
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;