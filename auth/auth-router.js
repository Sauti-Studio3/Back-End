const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({it: 'is working!'});
})


module.exports = router;