// bring in our db connection
const knex = require('../connection');

function getSingleRoleById(id) {
    return knex('roles')
    .select('*')
    .where({ id: parseInt(id) });
}

function getSingleRoleByName (name) {
    return knex('roles')
    .select('*')
    .where('name', 'like', name);   
}

module.exports = {
    getSingleRoleById,
    getSingleRoleByName
}