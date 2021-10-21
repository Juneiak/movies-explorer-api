const { Joi } = require('celebrate');

const urlRegEx = /https*:\/\/[w{3}]*\.*[\w\-./_~:?#[\]@!$&'()*+,;=]*\.\w{2,3}[\w/]*#?/;

const ruRegEx = /[a-z]/gi;

const engRegEx = /[а-яё]/gi;

const updateUserInfoJoi = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
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
    name: Joi.string().min(2).max(30).required(),
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
    image: Joi.string().required().pattern(urlRegEx),
    trailer: Joi.string().required().pattern(urlRegEx),
    nameRU: Joi.string().required().pattern(ruRegEx, { invert: true }),
    nameEN: Joi.string().required().pattern(engRegEx, { invert: true }),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    movieId: Joi.string().required(),
  }),
};

module.exports = {
  addMovieJoi,
  deleteMovieJoi,
  signupJoi,
  signinJoi,
  updateUserInfoJoi,
};
