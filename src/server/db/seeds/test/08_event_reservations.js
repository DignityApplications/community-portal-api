exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('event_reservations')
    .truncate()
    .del()
    
    .then(() => {
        return knex('event_reservations').insert({
            user_id: 1,
            event_id: 5,
            attendees: 1
        });
    })
    .then(() => {
        return knex('event_reservations').insert({
            user_id: 1,
            event_id: 5,
            attendees: 5
        });
    })
    .then(() => {
        return knex('event_reservations').insert({
            user_id: 1,
            event_id: 4,
            attendees: 1
        });
    })
};
  