const router = require('express').Router();
const Flows = require('../flows/flows-model');
const Pages = require('../pages/pages-model');
const validateBody = require('../middleware/validate-body-middleware');
const restrictUser = require('../middleware/restrict-user-middleware');

// router.get('/',  (req, res) => {
//   res.status(200).json({message: 'You got to the flows endpoint!'})
// });

router.use('/:id', validateFlowId, restrictUser('flows'))

router.get('/:id', (req, res) => {
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

router.put('/:id', validateBody('flows'), (req, res) => {
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Flows.remove(id)
    .then(flow => {
      res.status(200).json(flow);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to delete flow.'
      });
    });
});

router.post('/:id/pages', validateBody('pages'), (req, res) => {
  const { id } = req.params;
  const page = {
    ...req.body,
    flow_id: id
  };
  Pages.add(page)
    .then(page => {
      res.status(201).json(page);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to save new page.'
      });
    });
});

function validateFlowId(req, res, next) {
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