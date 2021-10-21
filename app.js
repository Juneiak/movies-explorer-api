const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { signin, signup, signout } = require('./controllers/auth');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const checkAuth = require('./middlewares/checkAuth');
const { NotFoundError } = require('./utils/customErrors/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const { signinJoi, signupJoi } = require('./utils/joiValidatorTemplates');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);
app.post('/signup', celebrate(signupJoi), signup);
app.post('/signin', celebrate(signinJoi), signin);
app.get('/signout', checkAuth, signout);

app.use('/users', checkAuth, usersRoutes);
app.use('/movies', checkAuth, moviesRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});
