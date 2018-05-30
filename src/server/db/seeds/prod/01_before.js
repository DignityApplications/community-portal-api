exports.seed = function(knex, Promise) {
    // rollback our database migrations and rerun migrations
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
};
