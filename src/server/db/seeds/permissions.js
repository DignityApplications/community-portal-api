exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del()
  // members
  .then(() => {
    return knex('permissions').insert({
      name: 'AddMember'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyMember'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyMember'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyMember'
    });
  })

  // staff
  .then(() => {
    return knex('permissions').insert({
      name: 'AddStaff'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyStaff'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyStaff'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyStaff'
    });
  })

  // guests
  .then(() => {
    return knex('permissions').insert({
      name: 'AddGuest'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyGuest'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyGuest'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyGuest'
    });
  })

  // website admins
  .then(() => {
    return knex('permissions').insert({
      name: 'AddWebAdmin'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'SeeAnyWebAdmin'
    });
  })
  .then(() => {
    return knex('permissions').insert({
      name: 'UpdateAnyWebAdmin'
    });
  }) 
  .then(() => {
    return knex('permissions').insert({
      name: 'DeleteAnyWebAdmin'
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
