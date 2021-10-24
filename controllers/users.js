const Users = require('../models/user');
const { NotFoundError, BadRequestError, ConflictError } = require('../utils/customErrors/index');

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  Users.findById(_id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => res.send({ email: userData.email, name: userData.name }))
    .catch((err) => {
      if (err.name === 'CastError') throw new BadRequestError('Ошибка валидации id');
      next(err);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  Users.findByIdAndUpdate(_id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((updatedUserInfo) => res.send({
      email: updatedUserInfo.email,
      name: updatedUserInfo.name,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) throw new ConflictError('Данный email уже зарегистрирован');
      if (err.name === 'ValidationError') throw new BadRequestError('Ошибка валидации вводимых данных');
      if (err.name === 'CastError') throw new BadRequestError('Ошибка валидации id');
      next(err);
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
