
// this is a junction table that is used to tie roles to permissions
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles_permissions', (table) => {
    table.increments();
    table.integer('role_id').unsigned().notNullable();
    table.integer('permission_id').unsigned().notNullable();
  });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles_permissions');
};
