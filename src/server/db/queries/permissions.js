// bring in our db connection
const knex = require('../connection');

function getPermissionsByActionAndResource(action, resource) {
    return knex('permissions')
    .select('*')
    .where('name', 'like', `${action}${resource}%`);
}

module.exports = {
    getPermissionsByActionAndResource
}