// bring in our db connection
const knex = require('../connection');

// return all roles
function getAllRoles () {
    return knex('roles')
    .select('*')
}

// get a single role
function getSingleRole(id) {
    return knex('roles')
    .select('*')
    .where({ id: parseInt(id) });
}

// get a single role by name
function getSingleRoleByName (name) {
    return knex('roles')
    .select('*')
    .where('name', 'like', name);   
}

// add a new role
function addRole(role) {
    // user should not be able to manually set these
    if (role.id) delete role.id;

    return knex('roles')
    .insert(role)
    .returning('*');
}

// update a role
function updateRole(id, role) {
    // user should not be able to manually set these
    if (role.id) delete role.id;
    
    return knex('roles')
    .update(role)
    .where({'roles.id': parseInt(id)})
    .returning('*');
}

// delete a role
function deleteRole(id) {
    return knex('roles')
    .del()
    .where({'roles.id': parseInt(id)})
    .returning('*');
}

module.exports = {
    getAllRoles,
    getSingleRole,
    getSingleRoleByName,
    addRole,
    updateRole,
    deleteRole
}