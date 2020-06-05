const router = require('express').Router();
const flowsRouter = require('../flows/flows-router');
const pagesRouter = require('../pages/pages-router');
const optionsRouter = require('../options/options-router');
const Users = require('../users/users-model');
const Flows = require('../flows/flows-model');
const validateBody = require('../middleware/validate-body-middleware');
const restrictUser = require('../middleware/restrict-user-middleware');

router.get('/:id/flows', validateUserId, restrictUser('users'), (req, res) => {
  const { id } = req.params;
  Flows.findByUserId(id)
    .then(flows => {
      res.status(200).json(flows);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get flows'
      });
    });
});

router.post('/:id/flows', validateUserId, validateBody('flows'), (req, res) => {
  const { id } = req.params;
  const flow = {
    ...req.body,
    user_id: id
  };
  Flows.add(flow)
    .then(flow => {
      res.status(201).json(flow);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Failed to save new flow.'
      });
    });
});

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.findById(id) 
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({
          message: `Could not find user with id ${id}.`
        });
      }
    }) ;
}

router.use('/flows', flowsRouter);
router.use('/pages', pagesRouter);
router.use('/options', optionsRouter);
  
module.exports = router;

