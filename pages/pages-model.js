const db = require('../data/db-config');

module.exports = {
  findByFlowId,
  findById,
  add,
  update,
  remove
}

function findByFlowId(flowId) {
  return db('pages')
    .where({flow_id: flowId});
}

function findById(id) {
  return db('pages')
    .where({ id })
    .first();
}

function add(page) {
  return db('pages')
    .insert(page)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db('pages')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return findById(id)
    .then(page => {
      return db('pages')
        .where({ id })
        .del()
        .then(() => {
          return page;
        });
    });
}
