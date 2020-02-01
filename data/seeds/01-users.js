
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          username: 'dlhauer',
          email: 'dlhauer@mail.com',
          password: 'dlhauer',
          country: 'usa',
          age: 33,
        },
        {
          id: 2, 
          username: 'dleeh',
          email: 'dleeh@mail.com',
          password: 'dleeh',
          age: 21,
        },
        {
          id: 3, 
          username: 'danlh',
          email: 'danlh@mail.com',
          password: 'danlh',
          country: 'kenya',
        }
      ]);
    });
};
