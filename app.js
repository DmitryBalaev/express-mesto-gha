require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/userRouter');
const cardsRouter = require('./routes/cardRouter');
const { PORT, MONGO_DB } = require('./utils/config');
const { NotFound } = require('./utils/responsesErrors/NotFound');
const authMiddleware = require('./middlewares/auth');
const { responseHandler } = require('./middlewares/responseHandler');
const { validateLogin, validateRegistration } = require('./utils/validationDataConfig');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '647756bd85d90546a56b9889',
  };

  next();
});

app.use(usersRouter, authMiddleware);
app.use(cardsRouter, authMiddleware);

app.use('/signin', validateLogin, login);
app.use('/signup', validateRegistration, createUser);

app.use('*', authMiddleware, (req, res, next) => {
  next(new NotFound('Указан не существующий путь.'));
});

app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`app listening port: ${PORT} `);
});
