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
      name: 'AddUserStaff'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyUserStaff'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyUserStaff'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyUserStaff'
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
};
