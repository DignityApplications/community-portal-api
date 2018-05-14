// bring in node modules
const bcrypt = require('bcryptjs');

// bring in our db connection
const knex = require('../connection');

// return all users
function getAllUsers(opts = null) {
    let query = knex('users')
    .select('id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'role_id', 'created_at', 'updated_at')
    .where(true) // empty so we can use andWhere below
    if (opts.startsWithLetter && opts.startsWithField) query.andWhere(opts.startsWithField, 'ilike', `${opts.startsWithLetter}%`);
    if (opts.searchTerm && opts.searchFields) {
        let whereRaw = '('
        opts.searchFields.forEach((val) => {
            if (index) whereRaw += ` OR ${val} ilike '%${opts.searchTerm}%'`
            else whereRaw += `${val} ilike '%${opts.searchTerm}%'`
        });
        whereRaw += ')'

        query.andWhereRaw(whereRaw);
    }
    if (opts.sortBy) query.orderBy(opts.sortBy, opts.sortDirection || 'asc');
    return query;
}

// return a single user
function getSingleUser(id) {
    return knex('users')
    .select('id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'role_id', 'created_at', 'updated_at')
    .where({ 'id': parseInt(id) });
}

// add a new user
function addUser(user) {
    user.password = bcrypt.hashSync(user.password, 10);
    user.email = user.email.toLowerCase();
    
    // user should not be able to manually set these
    if (user.id) delete user.id;
    if (user.created_at) delete user.created_at;
    if (user.updated_at) delete user.updated_at;

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
    if (user.email) user.email = user.email.toLowerCase();
    
    // user should not be able to manually set these
    if (user.id) delete user.id;
    if (user.created_at) delete user.created_at;

    user.updated_at = new Date();

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
function getUsersByRole(role_id, opts = null) {
    let query = knex('users')
    .select('id', 'email', 'first_name', 'last_name', 
    'date_of_birth', 'home_phone_number', 'cell_phone_number',
    'current_address', 'previous_address', 'avatar_path', 'bio', 
    'role_id', 'created_at', 'updated_at')
    query.where({ 'role_id': parseInt(role_id) })
    if (opts.startsWithLetter && opts.startsWithField) query.andWhere(opts.startsWithField, 'ilike', `${opts.startsWithLetter}%`);
    if (opts.searchTerm && opts.searchFields) {
        let whereRaw = '('
        opts.searchFields.forEach((val) => {
            if (index) whereRaw += ` OR ${val} ilike '%${opts.searchTerm}%'`
            else whereRaw += `${val} ilike '%${opts.searchTerm}%'`
        });
        whereRaw += ')'

        query.andWhereRaw(whereRaw);  
    }
    if (opts.sortBy) query.orderBy(opts.sortBy, opts.sortDirection || 'asc');
    return query;
}

module.exports = {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    getUsersByRole
}