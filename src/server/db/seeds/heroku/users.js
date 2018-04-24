const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()

  // add WebAdmins
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
      email: 'WebAdmin1@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin11234', 10),
      first_name: 'Web',
      last_name: 'Admin1',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 1 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 1 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin1.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin2@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin21234', 10),
      first_name: 'Web',
      last_name: 'Admin2',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 2 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 2 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin2.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin3@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin31234', 10),
      first_name: 'Web',
      last_name: 'Admin3',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 3 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 3 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin3.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin4@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin41234', 10),
      first_name: 'Web',
      last_name: 'Admin4',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 4 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 4 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin4.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin5@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin51234', 10),
      first_name: 'Web',
      last_name: 'Admin5',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 5 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 5 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin5.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin6@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin61234', 10),
      first_name: 'Web',
      last_name: 'Admin6',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 6 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 6 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin6.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin7@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin71234', 10),
      first_name: 'Web',
      last_name: 'Admin7',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 7 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 7 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin7.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin8@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin81234', 10),
      first_name: 'Web',
      last_name: 'Admin8',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 8 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 8 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin8.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin9@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin91234', 10),
      first_name: 'Web',
      last_name: 'Admin9',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 1 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 1 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin9.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin10@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin101234', 10),
      first_name: 'Web',
      last_name: 'Admin10',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 1 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 1 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin10.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'WebAdmin10@dignityapps.com',
      password: bcrypt.hashSync('WebAdmin101234', 10),
      first_name: 'Web',
      last_name: 'Admin10',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Web Admin 10 Rd. Wilmington NC 28111',
      previous_address: 'Web Admin 10 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/WebAdmin10.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 4
    });
  })

  // add Members
  .then(() => {
    return knex('users').insert({
      email: 'Member1@dignityapps.com',
      password: bcrypt.hashSync('Member11234', 10),
      first_name: 'Member',
      last_name: '1',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 1 Rd. Wilmington NC 28111',
      previous_address: 'Member 1 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member1.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member2@dignityapps.com',
      password: bcrypt.hashSync('Member21234', 10),
      first_name: 'Member',
      last_name: '2',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 2 Rd. Wilmington NC 28111',
      previous_address: 'Member 2 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member2.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member3@dignityapps.com',
      password: bcrypt.hashSync('Member31234', 10),
      first_name: 'Member',
      last_name: '3',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 3 Rd. Wilmington NC 28111',
      previous_address: 'Member 3 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member3.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member4@dignityapps.com',
      password: bcrypt.hashSync('Member41234', 10),
      first_name: 'Member',
      last_name: '4',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 4 Rd. Wilmington NC 28111',
      previous_address: 'Member 4 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member4.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member5@dignityapps.com',
      password: bcrypt.hashSync('Member51234', 10),
      first_name: 'Member',
      last_name: '5',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 5 Rd. Wilmington NC 28111',
      previous_address: 'Member 5 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member5.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member6@dignityapps.com',
      password: bcrypt.hashSync('Member61234', 10),
      first_name: 'Member',
      last_name: '6',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 6 Rd. Wilmington NC 28111',
      previous_address: 'Member 6 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member6.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member7@dignityapps.com',
      password: bcrypt.hashSync('Member71234', 10),
      first_name: 'Member',
      last_name: '7',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 7 Rd. Wilmington NC 28111',
      previous_address: 'Member 7 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member7.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member8@dignityapps.com',
      password: bcrypt.hashSync('Member81234', 10),
      first_name: 'Member',
      last_name: '8',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 8 Rd. Wilmington NC 28111',
      previous_address: 'Member 8 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member8.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member9@dignityapps.com',
      password: bcrypt.hashSync('Member91234', 10),
      first_name: 'Member',
      last_name: '9',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 9 Rd. Wilmington NC 28111',
      previous_address: 'Member 9 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member9.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member10@dignityapps.com',
      password: bcrypt.hashSync('Member101234', 10),
      first_name: 'Member',
      last_name: '10',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 10 Rd. Wilmington NC 28111',
      previous_address: 'Member 10 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member10.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member11@dignityapps.com',
      password: bcrypt.hashSync('Member111234', 10),
      first_name: 'Member',
      last_name: '11',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 11 Rd. Wilmington NC 28111',
      previous_address: 'Member 11 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member11.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member12@dignityapps.com',
      password: bcrypt.hashSync('Member121234', 10),
      first_name: 'Member',
      last_name: '12',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 12 Rd. Wilmington NC 28111',
      previous_address: 'Member 12 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member12.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member13@dignityapps.com',
      password: bcrypt.hashSync('Member131234', 10),
      first_name: 'Member',
      last_name: '13',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 13 Rd. Wilmington NC 28111',
      previous_address: 'Member 13 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member13.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member14@dignityapps.com',
      password: bcrypt.hashSync('Member141234', 10),
      first_name: 'Member',
      last_name: '14',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 14 Rd. Wilmington NC 28111',
      previous_address: 'Member 14 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member14.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Member15@dignityapps.com',
      password: bcrypt.hashSync('Member151234', 10),
      first_name: 'Member',
      last_name: '15',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Member 15 Rd. Wilmington NC 28111',
      previous_address: 'Member 15 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Member15.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })

  // add Administrative Staff
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff1@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff11234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '1',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Administrative Staff 1 Rd. Wilmington NC 28111',
      previous_address: 'Administrative Staff 1 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff1.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff2@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff21234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '2',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 2 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 2 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaf2.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff3@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff31234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '3',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 3 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 3 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff3.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff4@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff41234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '4',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 4 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 4 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff4.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff5@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff51234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '5',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 5 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 5 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff5.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff6@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff61234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '6',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 6 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 6 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff6.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff7@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff71234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '7',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 7 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 7 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff7.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff8@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff81234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '8',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 8 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 8 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff8.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff9@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff91234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '9',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 9 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 9 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff9.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff10@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff101234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '10',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 10 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 10 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff10.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff11@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff111234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '11',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 11 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 11 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff11.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff12@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff121234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '12',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 12 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 12 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff12.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff13@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff131234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '13',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 13 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 13 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff13.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff14@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff141234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '14',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 14 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 14 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff14.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'AdministrativeStaff15@dignityapps.com',
      password: bcrypt.hashSync('AdministrativeStaff151234', 10),
      first_name: 'AdministrativeStaff',
      last_name: '15',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'AdministrativeStaff 15 Rd. Wilmington NC 28111',
      previous_address: 'AdministrativeStaff 15 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/AdministrativeStaff15.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })

  // add Guests
  .then(() => {
    return knex('users').insert({
      email: 'Guest1@dignityapps.com',
      password: bcrypt.hashSync('Guest11234', 10),
      first_name: 'Guest',
      last_name: '1',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Guest 1 Rd. Wilmington NC 28111',
      previous_address: 'Guest 1 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Guest1.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 3
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Guest2@dignityapps.com',
      password: bcrypt.hashSync('Guest21234', 10),
      first_name: 'Guest',
      last_name: '2',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Guest 2 Rd. Wilmington NC 28111',
      previous_address: 'Guest 2 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Guest2.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 3
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'Guest3@dignityapps.com',
      password: bcrypt.hashSync('Guest31234', 10),
      first_name: 'Guest',
      last_name: '3',
      date_of_birth: '11/20/1995',
      home_phone_number: '704-372-1423',
      cell_phone_number: '965-367-321',
      current_address: 'Guest 3 Rd. Wilmington NC 28111',
      previous_address: 'Guest 3 Rd. Monroe NC 28113',
      avatar_path: '/images/avatars/Guest3.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 3
    });
  })
  
  // add Unregistered user
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
};
