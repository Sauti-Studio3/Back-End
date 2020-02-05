const db = require('../data/db-config');

module.exports = {
  findById,
  findBy,
  findFlows,
  findPages
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db('users')
    .where(filter);
}

function findFlows(username) {
  return db('users as u')
    .where({ username })
    .join('flows as f', 'u.id', 'f.user_id')
    .select('f.id');
}

function findPages(username) {
  return db('users as u')
    .where({ username })
    .join('flows as f', 'u.id', 'f.user_id')
    .join('pages as p', 'f.id', 'p.flow_id')
    .select('p.id');
}