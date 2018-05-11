// get our router and node modules
const Router = require('koa-router');
const passport = require('koa-passport');

// get our user queries
const userQueries = require('../db/queries/users');

const router = new Router();
const BASE_URL = `/auth`;

// bring in our parser
const bodyParser = require('koa-body');

router.post(`${BASE_URL}/login`, bodyParser(), async(ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            let resUser = user;
            delete resUser.password
            ctx.body = {
                status: 'good!',
                message: 'User successfully authenticated!',
                user: resUser
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'no good :(',
                message: 'User authentication failed.'
            }
        }
    })(ctx);
});

router.get(`${BASE_URL}/logout`, async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.body = {
            status: 'good!',
            message: 'User successfully logged out.'
        }
    } else {
        ctx.body = {
            status: 'no good :('
        }
        ctx.throw(401);
    }
});

router.get(`${BASE_URL}/status`, async (ctx) => {
    if (ctx.isAuthenticated()) {
        let user = (await userQueries.getSingleUser(ctx.state.user.id))[0];
        ctx.body = {
            status: 'good!',
            loggedin: true,
            user
        }
    } else {
        ctx.body = {
            status: 'good!',
            loggedin: false
        }
    }
});

module.exports = router;