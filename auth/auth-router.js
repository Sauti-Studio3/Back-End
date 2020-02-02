const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');
const Users = require('./auth-model');

router.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get users.'
      });
    });
});

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bc.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to save new user.'
      });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bc.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({token: token})
      } else {
        res.status(401).json({
          message: 'Invalid login credentials. Please try again.'
        })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to log in.'
      });
    });
});

function signToken(user) {
  const payload = {
    username: user.username,
    password: user.password
  };
  const options = {
    expiresIn: '2h'
  };
  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;