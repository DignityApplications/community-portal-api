// set the node environment
const environment = process.env.NODE_ENV || 'development';

// require Koa and create a new koa app
const Koa = require('koa');

// bring in Koa middleware
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const app = new Koa();
const PORT = 3000;

// register our middleware with Koa
app.use(bodyParser());

// bring in our route files
const indexRoutes = require('./routes/index');

// register all of our routes with our Koa app
app.use(indexRoutes.routes());

// auth init
require('./auth');
app.use(passport.initialize());

if (environment == 'development') {
    // set the x-response-time header
    app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    });

    // log our http requests 
    app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    });
}

// create our Koa web server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
