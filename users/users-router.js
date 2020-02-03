const router = require('express').Router();
const flowsRouter = require('../flows/flows-router');
const pagesRouter = require('../pages/pages-router');
const optionsRouter = require('../options/options-router');

router.get('/', (req, res) => {
  res.status(200).json({message: 'You have reached users-router.'});
});

router.get('/:id/flows', (req, res) => {
  res.status(200).json(dummyFlowArray);
})

router.use('/flows', flowsRouter);
router.use('/pages', pagesRouter);
router.use('/options', optionsRouter);

const dummyFlowArray = [
  {
    id: 1,
    name: 'Sauti Flow 1',
    category: 'Build Week app',
    pages: [
      {
        id: 5,
        name: 'home',
        description: 'the first page in my app',
        options: [
          {
            id: 2,
            value: 'go back',
          },
          {
            id: 5,
            value: 'continue',
          },
          {
            id: 7,
            value: 'continue',
          },
        ],
      },
      {
        id: 9,
        name: 'sign up',
        description: 'users sign up here',
        options: [
          {
            id: 3,
            value: 'sign up',
          },
          {
            id: 4,
            value: 'Already have an account? Log in.',
          },
        ],
      }
    ]
  }
];

module.exports = router;