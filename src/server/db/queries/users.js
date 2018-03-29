const knex = require('../connection');

// return all users
function getAllUsers() {
    return knex('users')
    .select('*');
}

// return a single job request
function getSingleUser(id) {
    return knex('users')
    .select('*')
    .where({ id: parseInt(id) });
}

module.exports = {
    getAllUsers,
    getSingleUser
}