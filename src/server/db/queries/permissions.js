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
    .leftJoin('permissions', 'roles_permissions.permission_id', 'permissions.id')
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
    // user should not be able to manually set these
    if (permission.id) delete permission.id;

    return knex('permissions')
    .insert(permission)
    .returning('*');
}

// update a permission
function updatePermission(id, permission) {
    // user should not be able to manually set these
    if (permission.id) delete permission.id;
    
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

// add a permission to a role using the roles_permissions junction table
function addPermissionToRole(role_permission) {
    return knex('roles_permissions')
    .insert(role_permission)
    .returning('*')
}

// remove a permission from a given role using the roles_permissions junction table
function removePermissionFromRole(role_id, permission_id) {
    return knex('roles_permissions')
    .del()
    .where({role_id, permission_id})
    .returning('*')
}

module.exports = {
    getPermissionsByActionAndResource,
    getPermissionsByRole,
    getAllPermissions,
    getSinglePermission,
    getSinglePermissionByName,
    addPermission,
    addPermissionToRole,
    updatePermission,
    deletePermission,
    removePermissionFromRole
}