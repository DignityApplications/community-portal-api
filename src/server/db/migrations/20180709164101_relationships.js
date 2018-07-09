
// this is a junction table that is used to tie users to other users 
// relationships will be one-directional, meaning that user2 will be the 'blank' of user1
// i.e. user2 is user1's husband
exports.up = function(knex, Promise) {
    return knex.schema.createTable('relationships', (table) => {
    table.increments();
    table.integer('user1').unsigned().notNullable().references('id').inTable('users');
    table.integer('user2').unsigned().notNullable().references('id').inTable('users');
    table.string('relationship').notNullable();
  });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('relationships');
};
