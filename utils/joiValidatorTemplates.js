const { Joi } = require('celebrate');
const validator = require('validator');

const engRegEx = /[а-яё]/;
const ruNameRegEx = /[А-ЯЁ]{1}[а-яё]{1,29}/;

const urlValidation = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message('неверный формат url');
};

const updateUserInfoJoi = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .pattern(ruNameRegEx),
    email: Joi.string().email().required(),
  }),
};

const signinJoi = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const signupJoi = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required()
      .pattern(ruNameRegEx),
  }),
};

const deleteMovieJoi = {
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
};

const addMovieJoi = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailer: Joi.string().required().custom(urlValidation),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required().pattern(engRegEx, { invert: true }),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
  }),
};

module.exports = {
  addMovieJoi,
  deleteMovieJoi,
  signupJoi,
  signinJoi,
  updateUserInfoJoi,
};
