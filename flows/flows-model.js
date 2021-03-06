const db = require('../data/db-config');

module.exports = {
  findByUserId,
  findById,
  add,
  update,
  remove
}

function findByUserId(userId) {
  return db('flows as f')
    .where({user_id: userId})
    .select('*');
}

function findById(id) {
  return db('flows')
    .where({ id })
    .first();
}

function add(flow) {
  return db('flows')
    .insert(flow)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db('flows')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return findById(id)
    .then(flow => {
      return db('flows')
        .where({ id })
        .del()
        .then(() => {
          return flow;
        });
    });
}
