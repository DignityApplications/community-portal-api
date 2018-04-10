// bring in node modules and local strategy
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const knex = require('./db/connection');

// configure passport to use basic username/password for auth
const options = {
    usernameField: 'email'
}

// function that compares the hashed password with what is stored in the database
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// specifies which data should be stored in the user session.
// we will store the id only, and retrieve the user object on 
// subsequent requests
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
// retrieve the user object based on the user id
passport.deserializeUser(function(id, done) {
    return knex('users').where({id}).first()
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(options, (email, password, done) => {
    knex('users').where({email}).first()
    .then((user) => {
        if (!user) return done(null, false);
        if (!comparePass(password, user.password)) {
            return done(null, false);
        } else {
            return done(null, user);
        }
    })
    .catch((err) => {return done(err); });
}))