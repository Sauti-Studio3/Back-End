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

function findById() {
  
}

function add() {
  
}

function update() {
  
}

function remove() {
  
}
