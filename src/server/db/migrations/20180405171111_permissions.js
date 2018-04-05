
// the permissions table will contain a list of permissions (addMember, deleteMember, etc. )
// which will be tied to permisions and roles
exports.up = function(knex, Promise) {
    return knex.schema.createTable('permissions', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('permissions');
};
