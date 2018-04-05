
// the roles table will contain a list of user roles
// which will be tied to permissions
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles');
};
