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
    if (event.created_at) delete event.created_at;
    if (event.updated_at) delete event.updated_at;

    return knex('events')
    .insert(event)
    .returning('*');
}

// update an event
function updateEvent(id, event) {
    // user should not be able to manually set these
    if (event.id) delete event.id;
    if (event.created_at) delete event.created_at;

    event.updated_at = new Date();
    
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