const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
const { signin, signup, signout } = require('./controllers/auth');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const checkAuth = require('./middlewares/checkAuth');
const { NotFoundError } = require('./utils/customErrors/index');
const { logger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/checkAuth');
const { signinJoi, signupJoi } = require('./utils/joiValidatorTemplates');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(logger);
app.post('/signup', celebrate(signupJoi), signup);
app.post('/signin', celebrate(signinJoi), signin);
app.post('/signout', signout);

app.use('/users', checkAuth, usersRoutes);
app.use('/movies', checkAuth, moviesRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});
