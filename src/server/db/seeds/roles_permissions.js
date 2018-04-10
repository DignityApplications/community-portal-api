exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('roles_permissions').del()
    // give all roles_permissions to WebAdmin
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 1,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 2,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 3,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 4,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 5,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 6,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 7,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 8,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 9,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 10,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 11,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 12,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 13,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 14,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 15,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 16,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 17,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 18,
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 19,
        });
    })
    
    // give roles_permissions to members

    // give roles_permissions to administrative staff

    // give roles_permissions to guests

    // give roles_permissions to unregistered visitors 
};
  