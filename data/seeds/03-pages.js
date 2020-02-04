
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pages').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pages').insert([
        {
          id: 1,
          name: 'home page',
          content: 'Use this handy app to check exchange rates.',
          flow_id: 1
        },
        {
          id: 2,
          name: 'home',
          content: 'Find vendors in your area.',
          flow_id: 2
        },
        {
          id: 3,
          name: 'region',
          content: 'Please select your current region.',
          flow_id: 2
        },
        {
          id: 4,
          name: 'product',
          content: 'Please select the product you are shopping for.',
          flow_id: 2
        },
        {
          id: 5,
          name: 'start page',
          content: 'Check border procedures for your intended crossing point.',
          flow_id: 3
        },
        {
          id: 6,
          name: 'crossing point',
          content: 'Please select your intended crossing point.',
          flow_id: 3
        },
      ]);
    });
};
