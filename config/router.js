const router = require('express').Router();
const crimes = require('../controllers/crimes');
const auth = require('../controllers/auth');

router.route('/crimes')
  .get(crimes.index)
  .post(crimes.create);

router.route('/crimes/:id')
  .get(crimes.show)
  .put(crimes.update)
  .delete(crimes.delete);


router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) =>
    res.status(404).json({
      message: 'Not found'
    }));

module.exports = router;
