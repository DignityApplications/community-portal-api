
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('roles_permissions', (table) => {
        table.integer('role_id').alter().unsigned().notNullable().references('id').inTable('roles').defaultsTo(1);
        table.integer('permission_id').alter().unsigned().notNullable().references('id').inTable('permissions').defaultsTo(1);
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('roles_permissions', (table) => {
        table.integer('role_id').alter().unsigned().notNullable();
        table.integer('permission_id').alter().unsigned().notNullable();
    });
};
