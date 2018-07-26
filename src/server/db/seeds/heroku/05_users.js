const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  .truncate()
  .del()

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
      bio: 'Garret\'s alright.',
      role_id: 4
    });
  })

  // add Members
  .then(() => {
    return knex('users').insert({
      email: 'juwan1972@gmail.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Melissa',
      last_name: 'Garcia',
      date_of_birth: '11/20/1954',
      home_phone_number: '317-356-1572',
      cell_phone_number: '317-391-7251',
      current_address: '1218 Clay Street, Indianapolis, Indiana 46219',
      previous_address: '1516 Bourbon Street, Indianapolis, Indiana 46219',
      avatar_path: '/images/person1.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'maudie.schuli@yahoo.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Alice',
      last_name: 'Cuthbertson',
      date_of_birth: '08/25/1948',
      home_phone_number: '920-410-8316',
      cell_phone_number: '715-451-6287',
      current_address: '2898 Sycamore Lake Road, Menasha, Wisconsin 54592',
      previous_address: '324 Sycamore Lake Road, Menasha, Wisconsin 54592',
      avatar_path: '/images/person2.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'dfranklin@gmail.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Dean',
      last_name: 'Franklin',
      date_of_birth: '10/24/1950',
      home_phone_number: '937-886-7960',
      cell_phone_number: '740-424-0655',
      current_address: '2537 Boggess Street Five Points (Warren), Ohio 45066',
      previous_address: '4693 Broadcast Drive, Ohio 45066',
      avatar_path: '/images/person3.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'buster2013@gmail.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Mildred',
      last_name: 'Green',
      date_of_birth: '02/27/1949',
      home_phone_number: '703-267-3366',
      cell_phone_number: '276-340-4221',
      current_address: '2355 Lawman Avenue, Fairfax, Virginia, 22030',
      previous_address: '896 Heavens Way, Fairfax, Virginia, 22030',
      avatar_path: '/images/person4.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'sflores@yahoo.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Suzanne',
      last_name: 'Flores',
      date_of_birth: '12/7/1956',
      home_phone_number: '830-288-0649',
      cell_phone_number: '361-652-1896',
      current_address: '1973 Morris Street, Victoria, Texas, 77901',
      previous_address: '3628 McDowell Street, Victoria, Texas, 77901',
      avatar_path: '/images/person5.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'aurelie2014@yahoo.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Michael',
      last_name: 'Selby',
      date_of_birth: '11/20/1995',
      home_phone_number: '859-588-9011',
      cell_phone_number: '502-408-4105',
      current_address: '2696 Black Stallion Road, Winchester, Kentucky, 40391',
      previous_address: '312 Heather Sees Way, Winchester, Kentucky, 40391',
      avatar_path: '/images/person6.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'royal_leffl@hotmail.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Charles',
      last_name: 'Walton',
      date_of_birth: '02/01/1948',
      home_phone_number: '972-592-6784',
      cell_phone_number: '469-960-2652',
      current_address: '3865 Worthington Drive, Plano, Texas, 75074',
      previous_address: '1950 Indiana Avenue, Plano, Texas, 75074',
      avatar_path: '/images/person7.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'member8@dignityapps.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Mary',
      last_name: 'Jackson',
      date_of_birth: '05/25/1949',
      home_phone_number: '906-863-6161',
      cell_phone_number: '906-290-1058',
      current_address: '2301 Pinewood Avenue, Menominee, Michigan, 49858',
      previous_address: '352 Gordon Street, Fullerton, California, 93632',
      avatar_path: '/images/person8.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'newton2004@hotmail.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Christopher',
      last_name: 'Lemos',
      date_of_birth: '03/14/1940',
      home_phone_number: '530-938-0169',
      cell_phone_number: '415-620-8312',
      current_address: '3665 Maxwell Farm Road, Weed, California, 96094',
      previous_address: '4248 Deans Lane, South Salem, New York, 10590',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'bernhard2001@gmail.com',
      password: bcrypt.hashSync('Member1234', 10),
      first_name: 'Luke',
      last_name: 'Williams',
      date_of_birth: '09/25/1983',
      home_phone_number: '253-383-1409',
      current_address: '434 Hillcrest Drive, Tacoma, Washington, 98402',
      previous_address: '161 Lakeland Terrace, Southfield, Michigan, 48075',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 1
    });
  })
  
  // add Administrative Staff
  .then(() => {
    return knex('users').insert({
      email: 'jerwin@livinginwisdom.com',
      password: bcrypt.hashSync('AdministrativeStaff1234', 10),
      first_name: 'Joel',
      last_name: 'Erwin',
      date_of_birth: '10/05/1984',
      home_phone_number: '720-836-6879',
      cell_phone_number: '303-726-7359',
      current_address: '2448 Clay Lick Road, Denver, Colorado, 80202',
      previous_address: '1871 Candlelight Drive, Denver, Colorado, 80202',
      avatar_path: '/images/person9.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'mlewis@livinginwisdom.com',
      password: bcrypt.hashSync('AdministrativeStaff1234', 10),
      first_name: 'Mary',
      last_name: 'Lewis',
      date_of_birth: '02/03/1986 ',
      home_phone_number: '860-695-4586',
      cell_phone_number: '860-202-0775',
      current_address: '4116 Copperhead Road, Hartford, Connecticut, 06103',
      previous_address: '3796 Golf Course Drive, Arlington, Virginia, 22206',
      avatar_path: '/images/person10.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'jmckinney@livinginwisdom.com',
      password: bcrypt.hashSync('AdministrativeStaff1234', 10),
      first_name: 'Jacklyn',
      last_name: 'McKinney',
      date_of_birth: '5/15/1985',
      home_phone_number: '206-995-2425',
      cell_phone_number: '360-201-2606',
      current_address: '1663 Chipmunk Lane, Seattle, Washington, 98101',
      previous_address: '1527 Bryan Street, Greensboro, North Carolina, 27409',
      avatar_path: '/images/person11.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      role_id: 2
    });
  })

};
