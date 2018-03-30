// bring in node modules
const bcrypt = require('bcryptjs');

// bring in our db connection
const knex = require('../connection');

// return all users
function getAllUsers() {
    return knex('users')
    .select('*');
}

// return a single user
function getSingleUser(id) {
    return knex('users')
    .select('*')
    .where({ id: parseInt(id) });
}

// add a new user
function addUser(user) {
    user.password = bcrypt.hashSync(user.password, 10);

    return knex('users')
    .insert(user)
    .returning('*');
}

// update a user
function updateUser(id, user) {
    if (user.password) user.password = bcrypt.hashSync(user.password, 10);

    return knex('users')
    .update(user)
    .where({id: parseInt(id)})
    .returning('*');
}

// delete a user
function deleteUser(id) {
    return knex('users')
    .del()
    .where({id: parseInt(id)})
    .returning('*');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser
}