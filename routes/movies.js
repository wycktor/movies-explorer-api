const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateIdMovie,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateIdMovie, deleteMovie);

module.exports = router;
