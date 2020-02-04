
exports.up = function(knex) {
  return knex.schema.createTable('pages', pages => {
    pages.increments();
    pages.string('name', 128)
      .notNullable();
    pages.string('content', 1000)
    pages.integer('flow_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('flows')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pages');
};
