
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dateTime('created_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').notNull().defaultsTo(knex.raw('CURRENT_TIMESTAMP'));
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumns('created_at', 'updated_at');
    });
};
