const router = require('express').Router();
const flowsRouter = require('../flows/flows-router');
const pagesRouter = require('../pages/pages-router');
const optionsRouter = require('../options/options-router');
const Users = require('../users/users-model');
const Flows = require('../flows/flows-model');
// const Pages = require('../pages/pages-model');

router.get('/', (req, res) => {
  res.status(200).json({message: 'You have reached users-router.'});
});

router.get('/:id/flows', validateUserId, (req, res) => {
  const { id } = req.params;
  Flows.findByUserId(id)
    .then(flows => {
      // const flowsWithPages = flows.map(async flow => {
      //   let pages = await Pages.findByFlowId(flow.id);
      //   console.log(flow, pages);
      //   return {
      //     ...flow,
      //     pages: pages
      //   }
      // })
      res.status(200).json(flows);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get flows'
      });
    });
});



router.post('/:id/flows', validateUserId, (req, res) => {
  
  const { id } = req.params;
  const flow = {
    ...req.body,
    user_id: id
  }
})

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.findById(id) 
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({
          message: 'Could not find user with given id'
        });
      }
    }) ;
}

router.use('/flows', flowsRouter);
router.use('/pages', pagesRouter);
router.use('/options', optionsRouter);
  

module.exports = router;

