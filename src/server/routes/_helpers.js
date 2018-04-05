const queries = require('../db/queries/users');

// ensures that the user is logged in
function ensureAuthenticated(context) {
  return context.isAuthenticated();
}

module.exports = {
  ensureAuthenticated
};