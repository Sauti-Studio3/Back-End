const router = require('express').Router();
const flowsRouter = require('../flows/flows-router');
const pagesRouter = require('../pages/pages-router');
const optionsRouter = require('../options/options-router');

router.get('/', (req, res) => {
  res.status(200).json({message: 'You have reached users-router.'});
})

router.use('/flows', flowsRouter);
router.use('/pages', pagesRouter);
router.use('/options', optionsRouter);
module.exports = router;