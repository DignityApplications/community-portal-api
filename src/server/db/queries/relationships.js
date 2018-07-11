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

// add a relationship
function addRelationship(relationship) {
    // user should not be able to manually set these
    if (relationship.id) delete relationship.id;

    return knex('relationships')
    .insert(relationship)
    .returning('*');
}

// get a single relationship
function getSingleRelationship(id) {
    return knex('relationships')
    .select('*')
    .where({ 'relationships.id': parseInt(id) });
}

// delete a relationship
function deleteRelationship(id) {
    return knex('relationships')
    .del()
    .where({'relationships.id': parseInt(id)})
    .returning('*');
}

module.exports = {
    getRelationshipsByUser,
    addRelationship,
    getSingleRelationship,
    deleteRelationship
}