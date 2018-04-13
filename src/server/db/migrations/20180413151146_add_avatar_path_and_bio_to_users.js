
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.string('avatar_path').nullable();
        table.text('bio').nullable();
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('avatar_path');
        table.dropColumn('bio');
    });
};
