exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
  .truncate()
  .del()
  
  .then(() => {
    return knex('roles').insert({
      name: 'Member'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'Administrative Staff'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'Guest'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'Web Admin'
    });
  })
  .then(() => {
    return knex('roles').insert({
      name: 'Unregistered'
    });
  });  
};
