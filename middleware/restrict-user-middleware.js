const Users = require('../users/users-model');

function restrictUser(endpoint) {
  return (req, res, next) => {
    const { username } = req;
    switch(endpoint) {
      case 'users':
        const pathId = parseInt(req.params.id);
        Users.findBy({ username })
          .first()
          .then(user => {
            if (user && user.id === pathId) {
              next();
            } else {
              res.status(401).json({
                message: `Sorry. You are user ${user.id}, not user ${pathId}. You can't access this endpoint.`
              });
            }
          });
        break;
        
      case 'flows':
        const flowIdParam = parseInt(req.params.id);
        Users.findFlows(username)
          .then(flows => {
            const flowIds = flows.map(flow => {
              const [flowId] = Object.values(flow);
              return flowId;
            }) ;
            if ( flowIds.includes(flowIdParam) ) {
              next();
            } else {
              res.status(401).json({
                message: `Sorry. The flow with id ${flowIdParam} doesn't belong to you.`
              });
            }
          });
        break;
      
      case 'pages':
        const pageIdParam = parseInt(req.params.id);
        Users.findPages(username)
          .then(pages => {
            const pageIds = pages.map(page => {
              const [pageId] = Object.values(page);
              return pageId;
            });
            if( pageIds.includes(pageIdParam) ) {
              next();
            } else {
              res.status(500).json({
                message: `Sorry. The page with id ${pageIdParam} doesn't belong to you.`
              });
            }
          });
        break;

      default: 
        next();
    }
  }
}

module.exports = restrictUser;
