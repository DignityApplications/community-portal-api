exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del()
  // members
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserMember' // 1
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserMember' // 2
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserMember' // 3
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserMember' // 4
    });
  })

  // staff
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserAdministrativeStaff' // 5
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserAdministrativeStaff' // 6
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserAdministrativeStaff' // 7
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserAdministrativeStaff' // 8
    });
  })

  // guests
  .then(() => {
    return knex('permissions').insert({ 
      name: 'AddUserGuest' // 9
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserGuest' // 10
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserGuest' // 11
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserGuest' // 12
    });
  })

  // website admins
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserWebAdmin' // 13
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserWebAdmin' // 14
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserWebAdmin' // 15
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserWebAdmin' // 16
    });
  })

  // unregistered
  .then(() => {
    return knex('permissions').insert({
      name: 'AddUserUnregistered' // 17
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserUnregistered' // 18
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserUnregistered' // 19
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserUnregistered' // 20
    });
  })
  
  // self
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeSelf' // 21
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateSelf' // 22
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteSelf' // 23
    });
  })
  
  // roles
  .then(() => {
    return knex('permissions').insert({
      name: 'AddRoles' // 24
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeRoles' // 25
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateRoles' // 26
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteRoles' // 27
    });
  })

  // permissions
  .then(() => {
    return knex('permissions').insert({
      name: 'AddPermissions' // 28
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeePermissions' // 29
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdatePermissions' // 30
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeletePermissions' // 31
    });
  })

  // events
  .then(() => {
    return knex('permissions').insert({
      name: 'AddEvents' // 32
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeEvents' // 33
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateEvents' // 34
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteEvents' // 35
    });
  })

};
