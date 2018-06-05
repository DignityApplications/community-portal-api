exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('settings')
    .truncate()
    .del()
  
    .then(() => {
      return knex('settings').insert({
          community_name: 'Unnamed community',
          // no address yet

          // no color, let's use the default
  
          // not installed by default (installation wizard is required before
          // interacting with the site)
      });
    })
  };
  