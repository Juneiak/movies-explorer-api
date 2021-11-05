require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const apiLimiter = require('./middlewares/apiLimiter');
const indexRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const corsHandler = require('./middlewares/corsHandler');

const { PORT = 3000, DB_URL, NODE_ENV } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(corsHandler);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);
app.use(apiLimiter);
app.use('', indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});
