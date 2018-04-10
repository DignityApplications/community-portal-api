exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
  .then(() => {
    return knex('roles').insert({
      name: 'Member'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'AdministrativeStaff'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'Guest'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'WebAdmin'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'Unregistered'
    });
  });  
};
