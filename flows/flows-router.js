const router = require('express').Router();
// const restricted = require('../middleware/restricted-middleware');
// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config/secrets');


router.get('/',  (req, res) => {
  res.status(200).json({message: 'You got to the flows endpoint!'})
})


module.exports = router;