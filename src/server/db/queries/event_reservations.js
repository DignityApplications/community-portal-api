// bring in our db connection
const knex = require('../connection');

// return all event reservations
function getAllEventReservations () {
    return knex('event_reservations')
    .select('*')
}

// get a single event reservation by id
function getSingleEventReservation(id) {
    return knex('event_reservations')
    .select('*')
    .where({ 'event_reservations.id': parseInt(id) });
}

// add a new event reservation
function addEventReservation(eventReservation) {
    // user should not be able to manually set these
    if (eventReservation.id) delete eventReservation.id;
    if (eventReservation.created_at) delete eventReservation.created_at;
    if (eventReservation.updated_at) delete eventReservation.updated_at;

    return knex('event_reservations')
    .insert(eventReservation)
    .returning('*');
}

// update an event reservation
function updateEventReservation(id, eventReservation) {
    // user should not be able to manually set these
    if (eventReservation.id) delete eventReservation.id;
    if (eventReservation.created_at) delete eventReservation.created_at;

    eventReservation.updated_at = new Date();
    
    return knex('event_reservations')
    .update(eventReservation)
    .where({'event_reservations.id': parseInt(id)})
    .returning('*');
}

// delete an event reservation
function deleteEventReservation(id) {
    return knex('event_reservations')
    .del()
    .where({'event_reservations.id': parseInt(id)})
    .returning('*');
}

// get all event reservations by user id
function getEventReservationsByUser(id) {
    return knex('event_reservations')
    .select('*')
    .where({user_id: parseInt(id)})
}

// get all event reservations by event id
// also, we'll populate the user's name for the sake of convenience
function getEventReservationsByEvent(id) {
    return knex('event_reservations')
    .select('event_reservations.id', 'event_reservations.event_id', 'event_reservations.user_id', 
            'event_reservations.attendees', 'users.first_name', 'users.last_name', 'event_reservations.created_at',
            'event_reservations.updated_at')
    .leftJoin('users', 'event_reservations.user_id', 'users.id')
    .where({event_id: parseInt(id)})
}

module.exports = {
    getAllEventReservations,
    getSingleEventReservation,
    addEventReservation,
    updateEventReservation,
    deleteEventReservation,
    getEventReservationsByUser,
    getEventReservationsByEvent
}