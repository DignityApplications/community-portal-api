
exports.up = function(knex, Promise) {
    return knex.schema.createTable('settings', (table) => {
    table.increments();
    table.string('community_name').notNull();
    table.string('address').nullable();
    table.string('city').nullable();
    table.string('state').nullable();
    table.string('zip').nullable();
    table.string('site_color').notNull().defaultsTo('#24305E');
    table.boolean('installed').notNull().defaultsTo(false);

    table.dateTime('created_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('settings');
};
