const router = require('express').Router();
const Flows = require('../flows/flows-model');
const Pages = require('../pages/pages-model');

router.get('/',  (req, res) => {
  res.status(200).json({message: 'You got to the flows endpoint!'})
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Flows.findById(id)
    .then(flow => {
      console.log(flow.id);
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


module.exports = router;