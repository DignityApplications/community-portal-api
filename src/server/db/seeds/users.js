exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      email: 'elliotsminion@gmail.com',
      password: 'test1234',
      first_name: 'Elliot',
      last_name: 'Simpson',
      date_of_birth: '11/03/1993',
      home_phone_number: '704-225-8792',
      cell_phone_number: '704-221-8792',
      current_address: '4536 Exuma Lane, Wilmington NC 28412',
      previous_address: '3714 Sincerity Rd., Monroe NC 28110'
    });
  })
  .then(() => {
    return knex('users').insert({
      email: 'garretrcorbett@gmail.com',
      password: 'test5432',
      first_name: 'Garret',
      last_name: 'Corbett',
      date_of_birth: '11/20/1993',
      home_phone_number: '704-228-8799',
      cell_phone_number: '704-685-3016',
      current_address: '7281 Savannah Run Loop, Wilmington NC 28411',
      previous_address: '1422 Parkview Cir., Wilmington NC 28403'
    });
  });
};
