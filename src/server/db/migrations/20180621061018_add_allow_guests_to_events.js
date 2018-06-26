
exports.up = function(knex, Promise) {
    return knex.schema.table('events', (table) => {
        table.boolean('allow_guests').notNull().defaultsTo(false);
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('events', (table) => {
        table.dropColumn('allow_guests');
    });
};
