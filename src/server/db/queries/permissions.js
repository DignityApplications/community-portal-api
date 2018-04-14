// bring in our db connection
const knex = require('../connection');

function getPermissionsByActionAndResource(action, resource) {
    return knex('permissions')
    .select('*')
    .where('name', 'like', `${action}${resource}%`);
}

function getPermissionsByRole(role_id) {
    return knex('roles_permissions')
    .select('*')
    .where({role_id})
}

module.exports = {
    getPermissionsByActionAndResource,
    getPermissionsByRole
}