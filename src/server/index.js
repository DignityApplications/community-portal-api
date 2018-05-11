// set the node environment
const environment = process.env.NODE_ENV || 'development';

// require Koa and create a new koa app
const Koa = require('koa');

// bring in Koa middleware
const bodyParser = require('koa-body');
const passport = require('koa-passport');
const session = require('koa-session');
const redisStore = require('koa-redis');
const serve = require('koa-static');
const cors = require('@koa/cors');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(cors({
    credentials: true
}));

app.use(serve('./uploads'));

// bring in our route files
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles');
const permissionRoutes = require('./routes/permissions')

// use sessions
app.keys = ['shh-youll-never-know'];

if (environment != 'production') {
    app.use(session({
        store: redisStore({})
    }, app));  
} else {
    app.use(session(app));
}  

// auth init
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// register all of our routes with our Koa app
app.use(indexRoutes.routes());
app.use(userRoutes.routes());
app.use(authRoutes.routes());
app.use(roleRoutes.routes());
app.use(permissionRoutes.routes());

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
