const db = require('../data/db-config');

module.exports = {
  findById,
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}