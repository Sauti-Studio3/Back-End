const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'You have reached the pages route.'});
})

module.exports = router;