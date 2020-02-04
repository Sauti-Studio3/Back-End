const router = require('express').Router();
const Pages = require('../pages/pages-model');
const Options = require('../options/options-model');

router.get('/', (req, res) => {
  res.status(200).json({message: 'You have reached the pages route.'});
})

router.get('/:id', (req, res) => {
  console.log(req.originalUrl);
  const { id } = req.params;
  Pages.findById(id)
    .then(page => {
      Options.findByPageId(page.id)
        .then(options => {
          const pageWithOptions = {
            ...page,
            options: options
          };
          res.status(200).json(pageWithOptions);
        })
    })
    .catch(error => {
      res.status(500).json({
        error: 'Failed to get page.'
      })
    })
})

module.exports = router;