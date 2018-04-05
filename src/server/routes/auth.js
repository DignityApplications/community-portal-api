// get our router and node modules
const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router();
const BASE_URL = `/auth`;

router.post(`${BASE_URL}/login`, async(ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.body = {
                status: 'good!',
                message: 'User successfully authenticated!'
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

router.get('/auth/logout', async (ctx) => {
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

module.exports = router;