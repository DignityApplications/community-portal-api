// bring in passport and ldap strategy
const passport = require('koa-passport');

// configure passport to use basic username/password for auth
/*
 In development


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

*/