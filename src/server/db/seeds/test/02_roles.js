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
    })
    
    

    // this role is reserved for testing deletion. It will not violate a foreign key constraint
    .then(() => {
      return knex('roles').insert({
        name: 'Test role (for deletion)'
      });
    });
  };
  