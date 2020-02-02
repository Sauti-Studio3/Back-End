const requiredFields = {
  register: [
    'username',
    'email',
    'password'
  ],
  login: [
    'username',
    'password'
  ]
};

function checkMissingFields(reqBody, endpoint) {
  const reqBodyKeys = Object.keys(reqBody);
  const missingFields = requiredFields[endpoint].filter(field => {
    return !reqBodyKeys.includes(field);
  });
  return missingFields;
}

function validateBody(req, res, next) {
  if (Object.entries(req.body).length > 0) {
    const endpoint = req.url.replace('/', '')
    const missingFields = checkMissingFields(req.body, endpoint);
    if (missingFields.length > 0) {
      res.status(400).json({
        message: `Request is missing the following required field(s): ${missingFields.join(', ')}`
      });
    } else {
      next();
    }
  } else {
    res.status(400).json({
      message: 'Request is missing body data.'
    })
  }
}

module.exports = validateBody;