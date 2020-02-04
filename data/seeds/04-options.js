
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('options').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('options').insert([
        {
          id: 1,
          name: 'ok',
          page_id: 1
        },
        {
          id: 2,
          name: 'go back',
          page_id: 1
        },
        {
          id: 3,
          name: 'ok',
          page_id: 2
        },
        {
          id: 4,
          name: 'quit',
          page_id: 2
        },
        {
          id: 5,
          name: 'Northern Kenya',
          page_id: 3
        },
        {
          id: 6,
          name: 'Western Kenya',
          page_id: 3
        },
        {
          id: 7,
          name: 'Uganda',
          page_id: 3
        },
        {
          id: 8,
          name: 'South Sudan',
          page_id: 3
        },
        {
          id: 9,
          name: 'bananas',
          page_id: 4
        },
        {
          id: 10,
          name: 'cassava',
          page_id: 4
        },
        {
          id: 11,
          name: 'groundnuts',
          page_id: 4
        },
        {
          id: 12,
          name: 'ok',
          page_id: 5
        },
        {
          id: 13,
          name: 'go back',
          page_id: 5
        },
        {
          id: 14,
          name: 'Busia',
          page_id: 6
        },
        {
          id: 15,
          name: 'Malaba',
          page_id: 6
        },
        {
          id: 16,
          name: 'Suam',
          page_id: 6
        }
      ]);
    });
};
