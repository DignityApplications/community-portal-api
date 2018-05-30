
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', (table) => {
        table.integer('role_id').alter().unsigned().notNullable().references('id').inTable('roles').defaultsTo(1);
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', (table) => {
        table.integer('role_id').alter().unsigned().notNullable();
    });
};
