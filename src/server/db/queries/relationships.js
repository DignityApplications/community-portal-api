// bring in our db connection
const knex = require('../connection');

// get all relationships for a given user
function getRelationshipsByUser(id) {
    return knex('relationships')
    .select('relationships.id', 'relationships.user1', 'users.first_name as user2_first_name', 
            'users.last_name as user2_last_name', 'relationships.relationship')
    .leftJoin('users', 'relationships.user2', 'users.id')
    .where({'relationships.user1': parseInt(id)});   
}

module.exports = {
    getRelationshipsByUser
}