exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('settings')
  .truncate()
  .del()
  
  .then(() => {
    return knex('settings').insert({
        community_name: 'Living with Dignity',
        address: '4536 Exuma Lane',
        city: 'Wilmington',
        state: 'NC',
        zip: '28412'
        // no color, let's use the default

        // not installed by default (installation wizard is required before
        // interacting with the site)
    });
  })
};
