exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('roles_permissions')
    .truncate()
    .del()
    
    // give all roles_permissions to WebAdmin
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 1, // AddUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 2, // SeeAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 3, // UpdateAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 4, // DeleteAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 5, // AddUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 6, // SeeAnyUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 7, // UpdateAnyUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 8, // DeleteAnyUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 9, // AddUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 10, // SeeAnyUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 11, // UpdateAnyUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 12, //DeleteAnyUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 13, // AddUserWebAdmin
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 14, // SeeAnyUserWebAdmin
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 15, // UpdateAnyUserWebAdmin
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 16, // DeleteAnyUserWebAdmin
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 17, // AddUserUnregistered
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 18, // SeeAnyUserUnregistered
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 19, // UpdateAnyUserUnregistered
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 20, // DeleteAnyUserUnregistered
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 21, // SeeSelf
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 22, // UpdateSelf
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 23, // DeleteSelf
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 24, // AddRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 25, // SeeRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 26, // UpdateRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 27, // DeleteRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 28, // AddPermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 29, // SeePermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 30, // UpdatePermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 31, // DeletePermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 32, // AddEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 33, // SeeEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 34, // UpdateEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 35, // DeleteEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 36, // SeeSettings
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 4,
            permission_id: 36, // UpdateSettings
        });
    })

    // give roles_permissions to members
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 1,
            permission_id: 2, // SeeAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 1,
            permission_id: 6, // SeeAnyUserStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 1,
            permission_id: 21, // SeeSelf
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 1,
            permission_id: 25, // SeeRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 1,
            permission_id: 29, // SeePermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 1,
            permission_id: 33, // SeeEvents
        });
    })

    // give roles_permissions to administrative staff
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 1, // AddUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 2, // SeeAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 3, // UpdateAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 4, // DeleteAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 5, // AddUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 6, // SeeAnyUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 7, // UpdateAnyUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 8, // DeleteAnyUserAdministrativeStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 9, // AddUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 10, // SeeAnyUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 11, // UpdateAnyUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 12, //DeleteAnyUserGuest
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 14, // SeeAnyUserWebAdmin
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 21, // SeeSelf
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 22, // UpdateSelf
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 25, // SeeRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 29, // SeePermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 32, // AddEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 33, // SeeEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 34, // UpdateEvents
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 2,
            permission_id: 35, // DeleteEvents
        });
    })

    // give roles_permissions to guests
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 3,
            permission_id: 2, // SeeAnyUserMember
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 3,
            permission_id: 6, // SeeAnyUserStaff
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 3,
            permission_id: 25, // SeeRoles
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 3,
            permission_id: 29, // SeePermissions
        });
    })
    .then(() => {
        return knex('roles_permissions').insert({
            role_id: 3,
            permission_id: 33, // SeeEvents
        });
    })
    
    // give roles_permissions to unregistered visitors 
};
  