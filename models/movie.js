const mongoose = require('mongoose');
const validator = require('validator');

const engValidation = (text) => !text.match(/[а-яё]/);

const urlValidation = (url) => validator.isURL(url);

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [urlValidation, 'urlValidationError'],
  },
  trailer: {
    type: String,
    required: true,
    validate: [urlValidation, 'urlValidationError'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [urlValidation, 'urlValidationError'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
    validate: [engValidation, 'language validationError (ENG)'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
