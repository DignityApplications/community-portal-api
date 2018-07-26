exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('relationships')
    .truncate()
    .del()
    
    .then(() => {
        return knex('relationships').insert({
            user1: 5,
            user2: 3,
            relationship: 'Wife'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 3,
            user2: 5,
            relationship: 'Husband'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 9,
            user2: 8,
            relationship: 'Brother'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 8,
            user2: 9,
            relationship: 'Sister'
        });
    })        
};
  