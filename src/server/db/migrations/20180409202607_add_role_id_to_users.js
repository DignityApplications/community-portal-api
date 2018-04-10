
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.integer('role_id').unsigned().notNullable();
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('role_id')
    });
};
