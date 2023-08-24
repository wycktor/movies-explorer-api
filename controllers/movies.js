const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');

const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(STATUS_CODE_OK).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => {
      res.status(STATUS_CODE_CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(
          new ForbiddenError('Нет доступа для удаления фильма'),
        );
      }
      return Movie.deleteOne(movie)
        .then(() => res.status(STATUS_CODE_OK).send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Введены некорректные данные'));
      } else next(err);
    });
};
