const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'You have reached the options route.'})
});

module.exports = router;