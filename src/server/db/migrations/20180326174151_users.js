
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.date('date_of_birth').nullable();
    table.string('home_phone_number').nullable();
    table.string('cell_phone_number').nullable();
    table.string('current_address').nullable();
    table.string('previous_address').nullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
