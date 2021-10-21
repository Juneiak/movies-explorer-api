const errorsHandler = (err, req, res, next) => {
  const { code = 500, message } = err;
  res.status(code).send({
    message: code === 500 ? 'Ошибка на стороне сервера' : message,
  });
  return next;
};

module.exports = errorsHandler;
