
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('username', 128)
      .unique()
      .notNullable();

    users
      .string('email', 255)
      .unique()
      .notNullable();

    users
      .string('password', 128)
      .notNullable();

    users.string('country', 128)

    users.integer('age')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
