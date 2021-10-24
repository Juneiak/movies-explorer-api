require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const { BadRequestError, ConflictError } = require('../utils/customErrors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

const signin = (req, res, next) => {
  const { email, password } = req.body;
  Users.findUserByCredentials(email, password)
    .then((user) => {
      const jwtToken = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'justAsecret',
        { expiresIn: '1d' },
      );
      res.cookie('token', jwtToken, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ message: 'loggedIn' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError('Ошибка валидации вводимых данных');
      next(err);
    })
    .catch(next);
};

const signup = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      password: hash,
      email,
      name,
    }))
    .then(() => res.send({ message: 'registerd' }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 1100) throw new ConflictError('Данный email уже зарегистрирован');
      if (err.name === 'ValidationError') throw new BadRequestError('Ошибка валидации вводимых данных');
      next(err);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'loggedOut' });
};

module.exports = {
  signin,
  signup,
  signout,
};
