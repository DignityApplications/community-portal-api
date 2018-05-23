const bcrypt = require('bcryptjs');
const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()

  // add WebAdmins
  .then(() => {
    return knex('events').insert({
      name: 'Knitting Club Meeting',
      description: 'The knitting club will be having their weekly meeting in building E room 10.',
      begin: moment().add(2, 'days').add(10, 'hours'),
      end: moment().add(2, 'days').add(12, 'hours'),
      location: 'Room E-10',
      creator: 2, // user id
      reservable: false
    });
  })
  .then(() => {
    return knex('events').insert({
      name: 'Concerto in Robertson Hall',
      description: 'There will be a concerto in Robertson Hall.',
      begin: moment().add(2, 'days').add(15, 'hours'),
      end: moment().add(2, 'days').add(18, 'hours'),
      location: 'Robertson Hall',
      creator: 2, // user id
      reservable: true,
      reservation_limit: 20
    });
  })
  .then(() => {
    return knex('events').insert({
      name: 'Board Meeting for STT',
      description: 'Our weekly STT board meeting will take place in Dobis Hall Room 5',
      begin: moment().add(2, 'days').add(10, 'hours'),
      end: moment().add(2, 'days').add(14, 'hours'),
      location: 'Dobis Hall Room 5',
      creator: 2, // user id
    });
  })
  .then(() => {
    return knex('events').insert({
      name: 'Bingo Night',
      description: 'Come join us!',
      begin: moment().add(2, 'days').add(13, 'hours'),
      end: moment().add(2, 'days').add(16, 'hours'),
      location: 'Dobis Hall Room 5',
      creator: 2, // user id
    });
  })
  .then(() => {
    return knex('events').insert({
      name: 'Gardening Club',
      description: 'We will be gardening',
      begin: moment().add(2, 'days').add(7, 'hours'),
      end: moment().add(2, 'days').add(9, 'hours'),
      location: 'Courtyard',
      creator: 1, // user id
    });
  })
  .then(() => {
    return knex('events').insert({
      name: 'Breakfast n\' Bible study!',
      description: 'We will be gardening our spirits',
      begin: moment().add(3, 'days').add(8, 'hours'),
      end: moment().add(3, 'days').add(10, 'hours'),
      location: 'Breakfast Room',
      creator: 1, // user id
    });
  })
};
