const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/customErrors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

const checkAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('требуется авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'justAsecret');
  } catch (err) {
    next(new UnauthorizedError('требуется авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = checkAuth;
