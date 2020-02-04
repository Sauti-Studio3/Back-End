const db = require('../data/db-config');

module.exports = {
  findByPageId,
  findById,
  add,
  update,
  remove
}

function findByPageId(pageId) {
  return db('options')
    .where({page_id: pageId});
}

function findById() {
  
}

function add() {
  
}

function update() {
  
}

function remove() {
  
}
