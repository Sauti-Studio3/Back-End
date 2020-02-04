
exports.up = function(knex) {
  return knex.schema.createTable('flows', flows => {
    flows.increments();
    flows.string('name', 128)
      .notNullable();
    flows.string('category', 128);
    flows.integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('flows');
};
