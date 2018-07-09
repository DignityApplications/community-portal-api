exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('relationships')
    .truncate()
    .del()
    
    .then(() => {
        return knex('relationships').insert({
            user1: 15,
            user2: 16,
            relationship: 'Wife'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 16,
            user2: 15,
            relationship: 'Husband'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 14,
            user2: 15,
            relationship: 'Brother'
        });
    })
    .then(() => {
        return knex('relationships').insert({
            user1: 15,
            user2: 14,
            relationship: 'Sister'
        });
    })        
};
  