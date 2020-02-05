const router = require('express').Router();
const Pages = require('../pages/pages-model');
const Options = require('../options/options-model');
const restricted = require('../middleware/restricted-middleware');
const restrictUser = require('../middleware/restrict-user-middleware');
const validateBody = require('../middleware/validate-body-middleware');

router.use('/:id', validatPageId, validateBody('pages'), restrictUser('pages'));

router.get('/:id', (req, res) => {
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
        });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Failed to get page.'
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Pages.update(changes, id)
    .then(page => {
      res.status(200).json(page);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to update page.'
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Pages.remove(id)
    .then(page => {
      res.status(200).json(page);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Failed to delete page.'
      });
    });
});

function validatPageId(req, res, next) {
  const { id } = req.params;
  Pages.findById(id) 
    .then(page => {
      if (page) {
        next();
      } else {
        res.status(404).json({
          message: `Could not find page with id ${id}.`
        });
      }
    }) ;
}

module.exports = router;