exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('event_reservations')
    .truncate()
    .del()
    
    .then(() => {
        return knex('event_reservations').insert({
            user_id: 5, // Member 3
            event_id: 1, // Knitting Club
            attendees: 2
        });
    })
    .then(() => {
        return knex('event_reservations').insert({
            user_id: 6, // Member 4
            event_id: 2, // Concerto
            attendees: 5
        });
    })
    .then(() => {
        return knex('event_reservations').insert({
            user_id: 7, // Member 5
            event_id: 3, // Board Meeting
            attendees: 1
        });
    })
};
  