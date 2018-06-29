// get our router and queries
const Router = require('koa-router');
const eventReservationQueries = require('../db/queries/event_reservations');
const userQueries = require('../db/queries/users');
const eventQueries = require('../db/queries/events');

// bring in our helper functions
const permissions = require('./_permissionHelpers');

// bring in our body parser
const bodyParser = require('koa-body');

const router = new Router();
const BASE_URL = `/api/v1/event_reservations`;

// return all event reservations
router.get(BASE_URL, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        // make sure the current user (or lack of user) can 'See' all event reservations
        let canDo = await permissions.canDo(user, 'SeeAll', 'EventReservations');
        if (canDo) {
            const event_reservations = await eventReservationQueries.getAllEventReservations();
            ctx.body = {
                status: 'good!',
                data: event_reservations
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

// return a single event reservation
router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        const eventReservationToSee = await eventReservationQueries.getSingleEventReservation(ctx.params.id);
        if (eventReservationToSee.length) {
            let canDo = false;
            if (user && user.id == eventReservationToSee[0].user_id) // they are trying to see their own event reservation
                canDo = await permissions.canDo(user, 'SeeOwn', 'EventReservations');
            else // they are trying to see another user's event reservation
                canDo = await permissions.canDo(user, 'SeeAll', 'EventReservations');

            if (canDo) {
                // let's go ahead and hydrate this route to make it easier on the frontend
                eventReservationToSee[0].user = (await userQueries.getSingleUser(eventReservationToSee[0].user_id))[0];
                eventReservationToSee[0].event = (await eventQueries.getSingleEvent(eventReservationToSee[0].event_id))[0];
                delete eventReservationToSee[0].user_id;
                delete eventReservationToSee[0].event_id;

                ctx.body = {
                    status: 'good!',
                    data: eventReservationToSee
                }
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
                message: 'That event reservation does not exist.'
            };
        }
            
    } catch (err) {
        console.log(err);
    }
});

// create a new event reservation
router.post(`${BASE_URL}`, bodyParser(), async(ctx) => {
    try {
        let user = ctx.state.user || null;

        let canDo = false;
        if (user && user.id == ctx.request.body.user_id) // they are trying to add their own event reservation
            canDo = await permissions.canDo(user, 'AddOwn', 'EventReservation');
        else // they are trying to add another user's event reservation
            canDo = await permissions.canDo(user, 'AddAny', 'EventReservation');

        if (canDo) {
            // before creating the event reservation, let's make sure we maintain integrity with reservation limits
            let eventToCheck = (await eventQueries.getSingleEvent(ctx.request.body.event_id))[0]
            let reservationLimit = (eventToCheck.allow_guests) ? (parseInt(eventToCheck.reservation_limit) || 100) : 1 // hard code a max res. limit
            if (!eventToCheck.reservable) reservationLimit = 1;
            if (parseInt(ctx.request.body.attendees) <= reservationLimit) {
                const eventReservation = await eventReservationQueries.addEventReservation(ctx.request.body);
                if (eventReservation.length) {
                    ctx.status = 201;
                    ctx.body = {
                        status: 'good!',
                        data: eventReservation
                    };
                } else {
                    ctx.status = 400;
                    ctx.body = {
                        status: 'no good :(',
                        message: 'Something went wrong.'
                    };
                }
            } else {
                ctx.status = 409;
                ctx.body = {
                    status: 'no good :(',
                    message: 'The reservation limit has been exceeded, therefore this reservation can not be made.'
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

// update an event reservation
router.put(`${BASE_URL}/:id`, bodyParser(), async (ctx) => {
    try {
        let user = ctx.state.user || null;

        const eventReservationToUpdate = await eventReservationQueries.getSingleEventReservation(ctx.params.id);
        if (eventReservationToUpdate.length) {
            let canDo = false;
            if (user && user.id == eventReservationToUpdate[0].user_id) // they are trying to update their own event reservation
                canDo = await permissions.canDo(user, 'UpdateOwn', 'EventReservations');
            else // they are trying to update another user's event reservation
                canDo = await permissions.canDo(user, 'UpdateAll', 'EventReservations');

            if (canDo) {
                // before creating the event reservation, let's make sure we maintain integrity with reservation limits
                let eventToCheck = (await eventQueries.getSingleEvent(eventReservationToUpdate[0].event_id))[0]
                let reservationLimit = (eventToCheck.allow_guests) ? (parseInt(eventToCheck.reservation_limit) || 100) : 1 // hard code a max res. limit
                if (!eventToCheck.reservable) reservationLimit = 1;
                if ((parseInt(ctx.request.body.attendees) <= reservationLimit) || !(ctx.request.body.attendees)) {
                    // we also want to make sure the user doesn't try and update the event_id. This would cause
                    // complications with attendee integrity, and shouldn't ever be done anyway.
                    // on top of this, it's best to make sure that the user also can't update the user_id, as it would make 
                    // much more sense to create a new reservation, and it avoids integrity issues.
                    if (ctx.request.body.event_id || ctx.request.body.user_id) throw ('Get outta here!');
                    else {
                        const eventReservation = await eventReservationQueries.updateEventReservation(ctx.params.id, ctx.request.body);
                        ctx.body = {
                            status: 'good!',
                            data: eventReservation
                        }
                    }
                } else {
                    ctx.status = 409;
                    ctx.body = {
                        status: 'no good :(',
                        message: 'The reservation limit has been exceeded, therefore this reservation can not be made.'
                    };  
                }
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
                message: 'That event reservation does not exist.'
            };
        }
    } catch (err) {
        console.log(err);
        ctx.status = 400;
        ctx.body = {
            status: 'no good :(',
            message: err.message || 'Sorry, an error has occurred'
        }
    }
});

// delete an event reservation
router.delete(`${BASE_URL}/:id`, async (ctx) => {
    try {
        let user = ctx.state.user || null;

        const eventReservationToDelete = await eventReservationQueries.getSingleEventReservation(ctx.params.id);
        if (eventReservationToDelete.length) {
            let canDo = false;
            if (user && user.id == eventReservationToDelete[0].user_id) // they are trying to delete their own event reservation
                canDo = await permissions.canDo(user, 'DeleteOwn', 'EventReservations');
            else // they are trying to delete another user's event reservation
                canDo = await permissions.canDo(user, 'DeleteAll', 'EventReservations');

            if (canDo) {
                const eventReservation = await eventReservationQueries.deleteEventReservation(ctx.params.id);
                ctx.body = {
                    status: 'good!',
                    data: eventReservation
                }
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
                message: 'That event reservation does not exist.'
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

module.exports = router;