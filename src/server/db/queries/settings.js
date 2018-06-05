// bring in our db connection
const knex = require('../connection');

// return the settings record
function getSettings () {
    return knex('settings')
    .select('*')
}

// update settings
function updateSettings(id, settings) {
    // user should not be able to manually set these
    if (settings.id) delete settings.id;
    if (settings.created_at) delete settings.created_at;

    settings.updated_at = new Date();
    
    return knex('settings')
    .update(settings)
    .where({'settings.id': parseInt(id)})
    .returning('*');
}

module.exports = {
    getSettings,
    updateSettings
}