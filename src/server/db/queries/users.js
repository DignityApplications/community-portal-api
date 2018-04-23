// bring in node modules
const bcrypt = require('bcryptjs');

// bring in our db connection
const knex = require('../connection');

// return all users
function getAllUsers() {
    return knex('users')
    .select('users.id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'roles.name as role', 'created_at', 'updated_at')
    .leftJoin('roles', 'users.role_id', 'roles.id')
}

// return a single user
function getSingleUser(id) {
    return knex('users')
    .select('users.id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'roles.name as role', 'created_at', 'updated_at')
    .leftJoin('roles', 'users.role_id', 'roles.id')
    .where({ 'users.id': parseInt(id) });
}

// add a new user
function addUser(user) {
    user.password = bcrypt.hashSync(user.password, 10);

    return knex('users')
    .insert(user)
    .returning(['id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'role_id', 'created_at', 'updated_at']);
}

// update a user
function updateUser(id, user) {
    if (user.password) user.password = bcrypt.hashSync(user.password, 10);

    return knex('users')
    .update(user)
    .where({'users.id': parseInt(id)})
    .returning(['id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'role_id', 'created_at', 'updated_at']);
}

// delete a user
function deleteUser(id) {
    return knex('users')
    .del()
    .where({'users.id': parseInt(id)})
    .returning(['id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'role_id', 'created_at', 'updated_at']);
}

// get users by role id 
function getUsersByRole(role_id) {
    return knex('users')
    .select('users.id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'roles.name as role', 'role_id', 'created_at', 'updated_at')
    .leftJoin('roles', 'users.role_id', 'roles.id')
    .where({ 'users.role_id': parseInt(role_id) });
}

module.exports = {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    getUsersByRole
}