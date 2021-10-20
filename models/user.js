const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/customErrors/index');

const validateEmail = (email) => validator.isEmail(email);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'incorrect email format'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Некорректные данные аккаунта'))
    .then((user) => (bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) throw new UnauthorizedError('Некорректные данные аккаунта');
        return user;
      })
    ));
};

module.exports = mongoose.model('user', userSchema);
