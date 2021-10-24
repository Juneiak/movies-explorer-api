const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieJoi, deleteMovieJoi } = require('../utils/joiValidatorTemplates');

router.get('/', getMovies);
router.post('/', celebrate(addMovieJoi), addMovie);
router.delete('/:movieId', celebrate(deleteMovieJoi), deleteMovie);

module.exports = router;
