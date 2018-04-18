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
    return knex('roles')
    .insert(role)
    .returning('*');
}

// update a role
function updateRole(id, role) {
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