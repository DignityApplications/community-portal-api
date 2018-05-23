
exports.up = function(knex, Promise) {
    return knex.schema.table('events', (table) => {
        table.renameColumn('name', 'title');
        table.renameColumn('begin', 'start');
        table.boolean('all_day').notNullable().defaultsTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('events', (table) => {
        table.renameColumn('title', 'name');
        table.renameColumn('start', 'begin');
        table.dropColumn('all_day');
    });
};
