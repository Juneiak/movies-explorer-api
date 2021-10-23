const indexRouter = require('express').Router();
const { celebrate } = require('celebrate');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { signin, signup, signout } = require('../controllers/auth');
const checkAuth = require('../middlewares/checkAuth');
const { NotFoundError } = require('../utils/customErrors/index');
const { signinJoi, signupJoi } = require('../utils/joiValidatorTemplates');

indexRouter.post('/signup', celebrate(signupJoi), signup);
indexRouter.post('/signin', celebrate(signinJoi), signin);
indexRouter.get('/signout', checkAuth, signout);

indexRouter.use('/users', checkAuth, usersRoutes);
indexRouter.use('/movies', checkAuth, moviesRoutes);

indexRouter.use('*', checkAuth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = indexRouter;
