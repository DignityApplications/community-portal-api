exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del()
  // members
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserMember'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserMember'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserMember'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserMember'
    });
  })

  // staff
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserAdministrativeStaff'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserAdministrativeStaff'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserAdministrativeStaff'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserAdministrativeStaff'
    });
  })

  // guests
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserGuest'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserGuest'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserGuest'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserGuest'
    });
  })

  // website admins
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserWebAdmin'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserWebAdmin'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserWebAdmin'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserWebAdmin'
    });
  })

  // unregistered
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserUnregistered'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserUnregistered'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserUnregistered'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserUnregistered'
    });
  })
  
  // self
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeSelf'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateSelf'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteSelf'
    });
  })
  
  // roles
  .then(() => {
    return knex('permissions').insert({
      name: 'AddRoles'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeRoles'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateRoles'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteRoles'
    });
  })

  // permissions
  .then(() => {
    return knex('permissions').insert({
      name: 'AddPermissions'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeePermissions'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdatePermissions'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeletePermissions'
    });
  })
};
