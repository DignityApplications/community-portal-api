// bring in our db connection
const knex = require('../connection');

function getSingleRole(id) {
    return knex('roles')
    .select('*')
    .where({ id: parseInt(id) });
}

module.exports = {
    getSingleRole
}