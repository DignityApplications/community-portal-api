
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('events', (table) => {
        table.integer('creator').alter().notNullable().references('id').inTable('users').defaultsTo(1);
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('events', (table) => {
        table.integer('creator').alter().notNullable();
    });
};
