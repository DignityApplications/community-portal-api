// get our router and queries
const Router = require('koa-router');
const eventQueries = require('../db/queries/events');
const eventReservationQueries = require('../db/queries/event_reservations');

// bring in our helper functions
const permissions = require('./_permissionHelpers');

// bring in our body parser
const bodyParser = require('koa-body');

const router = new Router();
const BASE_URL = `/api/v1/events`;

// return all events
router.get(BASE_URL, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' all events
        let canDo = await permissions.canDo(user, 'See', 'Events');
        if (canDo) {
            const events = await eventQueries.getAllEvents();
            ctx.body = {
                status: 'good!',
                data: events
            };
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };
        }
    } catch (err) {
        console.log(err);
    }
});

// return a single event
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' events
        let canDo = false;
        canDo = await permissions.canDo(user, 'See', 'Events');

        if (canDo) {
            const event = await eventQueries.getSingleEvent(ctx.params.id);
            if (event.length) {
                ctx.body = {
                    status: 'good!',
                    data: event
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That event does not exist.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };            
        }
    } catch (err) {
        console.log(err);
    }
});

// create a new event
router.post(`${BASE_URL}`, bodyParser(), async(ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Add' events
        let canDo = await permissions.canDo(user, 'Add', 'Events');

        if (canDo) {
            const event = await eventQueries.addEvent(ctx.request.body);
            if (event.length) {
                ctx.status = 201;
                ctx.body = {
                    status: 'good!',
                    data: event
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'no good :(',
                    message: 'Something went wrong.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };             
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred'
        };
    }
});

// update an event
router.put(`${BASE_URL}/:id`, bodyParser(), async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Update' events
        let canDo = false;
        canDo = await permissions.canDo(user, 'Update', 'Events');

        if (canDo) {
            const event = await eventQueries.updateEvent(ctx.params.id, ctx.request.body);
            if (event.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: event
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That event does not exist.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };    
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred'
        }
    }
});

// delete an event
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'Delete' events
        let canDo = false;
        canDo = await permissions.canDo(user, 'Delete', 'Events');

        if (canDo) {
            const event = await eventQueries.deleteEvent(ctx.params.id);
            if (event.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'good!',
                    data: event
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'no good :(',
                    message: 'That event does not exist.'
                };
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 'no good :(',
                message: 'User does not have the necessary permissions to perform this action.'
            };              
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
})

// return all event reservations for a single event
router.get(`${BASE_URL}/:id/event_reservations`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // get the event that is being accessed
        const eventToSee = await eventQueries.getSingleEvent(ctx.params.id);
 
        // make sure the event exists
        if (eventToSee.length) {
            // the user will need to be able to 'see' all event reservations
            let canDo = (await permissions.canDo(user, 'SeeAll', 'EventReservations'));

            if (canDo) {
                // get all of the event reservations for the given event
                const eventReservations = await eventReservationQueries.getEventReservationsByEvent(ctx.params.id);
                ctx.body = {
                    status: 'good!',
                    data: eventReservations
                };                
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'no good :(',
                    message: 'User does not have the necessary permissions to perform this action.'
                };                 
            }   
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'no good :(',
                message: 'That event does not exist.'
            };            
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;