
exports.up = function(knex) {
  return knex.schema.createTable('options', options => {
    options.increments();
    options.string('name', 128)
      .notNullable();
    options.integer('page_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('pages')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })  
};

exports.down = function(knex) {
  
};
