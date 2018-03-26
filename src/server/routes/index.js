// bring in Koa router
const Router = require('koa-router');
const router = new Router();

// GET the '/' route
router.get('/', async (ctx) => {
    ctx.body = {
        status: 'good!',
        message: 'Community Portal API is running!'
    };
});

module.exports = router;
