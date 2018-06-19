
exports.up = function(knex, Promise) {
    return knex.schema.createTable('event_reservations', (table) => {
    table.increments();
    table.integer('user_id').notNull().references('id').inTable('users');
    table.integer('event_id').notNull().references('id').inTable('events');
    table.integer('attendees').notNull().defaultsTo(1);

    table.dateTime('created_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('event_reservations');
};
