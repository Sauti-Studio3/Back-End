
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('flows').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('flows').insert([
        {
          id: 1,
          name: 'check exchange rates',
          category: 'sellers',
          user_id: 1
        },
        {
          id: 2,
          name: 'find vendors',
          category: 'buyers',
          user_id: 1
        },
        {
          id: 3,
          name: 'check border procedures',
          user_id: 2
        }
      ]);
    });
};
