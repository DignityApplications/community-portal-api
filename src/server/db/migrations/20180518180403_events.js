
exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.dateTime('begin').notNullable();
    table.dateTime('end').notNullable();
    table.string('location').nullable();
    table.integer('creator').notNullable(); // user id
    table.boolean('reservable').notNullable().defaultsTo(false);
    table.integer('reservation_limit').nullable();

    table.dateTime('created_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events');
};
