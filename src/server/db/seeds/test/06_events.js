const bcrypt = require('bcryptjs');
const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events')
  .truncate()
  .del()

  // add WebAdmins
  .then(() => {
    return knex('events').insert({
      title: 'Knitting Club Meeting',
      description: 'The knitting club will be having their weekly meeting in building E room 10.',
      start: moment().add(2, 'days').startOf('day').add(10, 'hours'),
      end: moment().add(2, 'days').startOf('day').add(12, 'hours'),
      location: 'Room E-10',
      creator: 2, // user id
      reservable: false
    });
  })
  .then(() => {
    return knex('events').insert({
      title: 'Concerto in Robertson Hall',
      description: 'There will be a concerto in Robertson Hall.',
      start: moment().add(2, 'days').startOf('day').add(15, 'hours'),
      end: moment().add(2, 'days').startOf('day').add(18, 'hours'),
      location: 'Robertson Hall',
      creator: 2, // user id
      reservable: true,
      reservation_limit: 20
    });
  })
  .then(() => {
    return knex('events').insert({
      title: 'Board Meeting for STT',
      description: 'Our weekly STT board meeting will take place in Dobis Hall Room 5',
      start: moment().add(2, 'days').startOf('day').add(10, 'hours'),
      end: moment().add(2, 'days').startOf('day').add(14, 'hours'),
      all_day: true,
      location: 'Dobis Hall Room 5',
      creator: 2, // user id
    });
  })
  .then(() => {
    return knex('events').insert({
      title: 'Bingo Night',
      description: 'Come join us!',
      start: moment().add(2, 'days').startOf('day').add(13, 'hours'),
      end: moment().add(2, 'days').startOf('day').add(16, 'hours'),
      location: 'Dobis Hall Room 5',
      creator: 2, // user id
    });
  })
  .then(() => {
    return knex('events').insert({
      title: 'Gardening Club',
      description: 'We will be gardening',
      start: moment().add(2, 'days').startOf('day').add(7, 'hours'),
      end: moment().add(2, 'days').startOf('day').add(9, 'hours'),
      location: 'Courtyard',
      creator: 1, // user id
    });
  })
  .then(() => {
    return knex('events').insert({
      title: 'Breakfast n\' Bible study!',
      description: 'We will be gardening our spirits',
      start: moment().add(3, 'days').startOf('day').add(8, 'hours'),
      end: moment().add(3, 'days').startOf('day').add(10, 'hours'),
      location: 'Breakfast Room',
      creator: 1, // user id
    });
  })
};
