const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          message: 'The JSON token has been tampered with. You cannot access this protected endpoint.'
        })
      } else {
        req.username = decodedToken.username;
        // console.log('req.body in restricted', req.body);
        next();
      }
    })
  } else {
    res.status(401).json({
      message: "You must log in to access this protected endpoint."
    });
  }
}