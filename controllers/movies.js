const Movies = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/customErrors/index');

const getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movies.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch(next);
};
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movies.findOne(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() === _id) {
        Movies.findOneAndDelete(movieId)
          .then((deletedMovie) => res.send(deletedMovie));
      } else throw new ForbiddenError('У вас нету прав на удаление этого фильма');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError('Ошибка валидации вводимых данных');
      if (err.name === 'CastError') throw new BadRequestError('Ошибка валидации id');
      next(err);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movies.create({
    owner: _id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((newMovieData) => res.send(newMovieData))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError(err.message);
      next(err);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
