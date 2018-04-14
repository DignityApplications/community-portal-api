// bring in our db connection
const roleQueries = require('../db/queries/roles');
const permissionQueries = require('../db/queries/permissions');

// bring in node modules
const _ = require('lodash');

// pass in the user, the action as a string, and the resource as a string (defaults to blank)
async function canDo (user, action, resource = '') {
    // make sure we have no spaces in the action or resource
    action = action.replace(' ', '');
    resource = resource.replace(' ', '');
    
    // if there is no user, they default to 'Unregistered'
    const unregistered = (await roleQueries.getSingleRoleByName('Unregistered'))[0];

    let role_id = (user) ? user.role_id : unregistered.id;

    // get the set of permissions that we are testing
    const permissions = await permissionQueries.getPermissionsByActionAndResource(action, resource);

    // get the permissions that the user's role can do
    const canDo = await permissionQueries.getPermissionsByRole(role_id);
     
    let permissionArr = permissions.map(p => p.id);
    let canDoArr = canDo.map(c => c.permission_id);

    return _.difference(permissionArr, canDoArr).length === 0;
}

module.exports = {
    canDo
}