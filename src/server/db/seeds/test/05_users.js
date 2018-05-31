const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  .truncate()
  .del()
  
  .then(() => {
    return knex('users').insert({
      email: 'elliotsminion@gmail.com',
      password: bcrypt.hashSync('test1234', 10),
      first_name: 'Elliot',
      last_name: 'Simpson',
      date_of_birth: '11/03/1993',
      home_phone_number: '704-225-8792',
      cell_phone_number: '704-221-8792',
      current_address: '4536 Exuma Lane, Wilmington NC 28412',
      previous_address: '3714 Sincerity Rd., Monroe NC 28110',
      avatar_path: '/images/avatars/Elliot.jpg',
      bio: 'Elliot is a fun-loving goofball. He is well-liked by most people - especially the ladies ;) Most describe ' +
      'Elliot as a "perfect person".',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'garretrcorbett@gmail.com',
      password: bcrypt.hashSync('test5432', 10),
      first_name: 'Garret',
      last_name: 'Corbett',
      date_of_birth: '11/20/1993',
      home_phone_number: '704-228-8799',
      cell_phone_number: '704-685-3016',
      current_address: '7281 Savannah Run Loop, Wilmington NC 28411',
      previous_address: '1422 Parkview Cir., Wilmington NC 28403',
      avatar_path: '/images/avatars/Garret.jpg',
      bio: 'Garret\'s alright.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'fakeuser@gmail.com',
      password: bcrypt.hashSync('test9876', 10),
      first_name: 'Jerry',
      last_name: 'Fake User',
      date_of_birth: '05/20/1942',
      home_phone_number: '704-378-7460',
      cell_phone_number: '704-233-8465',
      current_address: '7281 Test Dr., Wilmington NC 28411',
      previous_address: '1422 Test Cir., Wilmington NC 28403',
      bio: 'He\'s not even real',
      role_id: 5
    });
  })


  // this user is reserved for testing deletion. It will not violate a foreign key constraint
  .then(() => {
    return knex('users').insert({
      email: 'deleteme@gmail.com',
      password: bcrypt.hashSync('delete', 10),
      first_name: 'Delete',
      last_name: 'Me',
      date_of_birth: '11/11/1991',
      home_phone_number: '704-228-8799',
      cell_phone_number: '704-685-3016',
      current_address: '7281 Delete Me Rd. NC 28411',
      previous_address: '1422 Delete Me Rd. NC 28403',
      bio: 'Get outta here.',
      role_id: 5
    });
  });
};
