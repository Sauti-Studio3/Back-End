const router = require('express').Router();
const Flows = require('../flows/flows-model');
const Pages = require('../pages/pages-model');
const validateBody = require('../middleware/validate-body-middleware');
const restrictUser = require('../middleware/restrict-user-middleware');

// router.get('/',  (req, res) => {
//   res.status(200).json({message: 'You got to the flows endpoint!'})
// });

// router.use(restrictUser('flows')); TODO: Doesn't work!

router.get('/:id', validateFlowId, restrictUser('flows'), (req, res) => {
  const { id } = req.params;
  Flows.findById(id)
    .then(flow => {
      // console.log(flow.id);
      Pages.findByFlowId(flow.id)
        .then(pages => {
          const flowWithPages = {
            ...flow,
            pages: pages
          }
          res.status(200).json(flowWithPages)
        })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get flow.'
      })
    })
})

router.put('/:id', validateFlowId, validateBody('flows'), restrictUser('flows'), (req, res) => {
  const { id } = req.params;
  const changes = req.body
  Flows.update(changes, id)
    .then(flow => {
      res.status(200).json(flow);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to update flow.'
       });
    });
});

router.delete('/:id', validateFlowId, restrictUser('flows'), (req, res) => {
  const { id } = req.params;
  Flows.remove(id)
    .then(flow => {
      res.status(200).json(flow);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to delete flow.'
      })
    })
})

function validateFlowId(req, res, next) {
  console.log('req.body in validateFlowId', req.body);
  const { id } = req.params;
  Flows.findById(id) 
    .then(flow => {
      if (flow) {
        next();
      } else {
        res.status(404).json({
          message: `Could not find flow with id ${id}.`
        });
      }
    }) ;
}


module.exports = router;