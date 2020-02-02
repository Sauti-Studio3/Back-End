const router = require('express').Router();
const restricted = require('../middleware/restricted-middleware');
// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config/secrets');

router.get('/', restricted, (req, res) => {
  res.status(200).json({message: 'You got to the flows endpoint!'})
})


module.exports = router;