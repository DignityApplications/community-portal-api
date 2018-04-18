// bring in our db connection
const knex = require('../connection');

// return all permissions
function getAllPermissions () {
    return knex('permissions')
    .select('*')
}

// get permission by action and resource
function getPermissionsByActionAndResource(action, resource) {
    return knex('permissions')
    .select('*')
    .where('name', 'like', `${action}${resource}%`);
}

// get permission by role id
function getPermissionsByRole(role_id) {
    return knex('roles_permissions')
    .select('*')
    .where({role_id})
}

// get a single permission by id
function getSinglePermission(id) {
    return knex('permissions')
    .select('*')
    .where({ id: parseInt(id) });
}

// get a single permission by name
function getSinglePermissionByName (name) {
    return knex('permissions')
    .select('*')
    .where('name', 'like', name);   
}

// add a new permission
function addPermission(permission) {
    return knex('permissions')
    .insert(permission)
    .returning('*');
}

// update a permission
function updatePermission(id, permission) {
    return knex('permissions')
    .update(permission)
    .where({'permissions.id': parseInt(id)})
    .returning('*');
}

// delete a permission
function deletePermission(id) {
    return knex('permissions')
    .del()
    .where({'permissions.id': parseInt(id)})
    .returning('*');
}

module.exports = {
    getPermissionsByActionAndResource,
    getPermissionsByRole,
    getAllPermissions,
    getSinglePermission,
    getSinglePermissionByName,
    addPermission,
    updatePermission,
    deletePermission
}