// bring in our db connection
const knex = require('../connection');

// return all events
function getAllEvents () {
    return knex('events')
    .select('*')
}

// get a single event by id
function getSingleEvent(id) {
    return knex('events')
    .select('*')
    .where({ id: parseInt(id) });
}

// add a new event
function addEvent(event) {
    // user should not be able to manually set these
    if (event.id) delete event.id;

    return knex('events')
    .insert(event)
    .returning('*');
}

// update an event
function updateEvent(id, event) {
    // user should not be able to manually set these
    if (event.id) delete event.id;
    
    return knex('events')
    .update(event)
    .where({'events.id': parseInt(id)})
    .returning('*');
}

// delete an event
function deleteEvent(id) {
    return knex('events')
    .del()
    .where({'events.id': parseInt(id)})
    .returning('*');
}

module.exports = {
    getAllEvents,
    getSingleEvent,
    addEvent,
    updateEvent,
    deleteEvent
}