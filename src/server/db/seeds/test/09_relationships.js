exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('relationships')
    .truncate()
    .del()
    
    .then(() => {
        return knex('relationships').insert({
            user1: 1,
            user2: 2,
            relationship: 'Friend'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 2,
            user2: 3,
            relationship: 'Husband'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 2,
            user2: 1,
            relationship: 'Friend'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 3,
            user2: 2,
            relationship: 'Wife'
        });
    })
};
  