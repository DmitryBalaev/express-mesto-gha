const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const usersRouter = require('./routes/userRouter');
const cardsRouter = require('./routes/cardRouter');

const app = express();
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
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

app.use(usersRouter);
app.use(cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Указан не существующий путь.' });
});

app.listen(PORT, () => {
  console.log(`app listening port: ${PORT} `);
});
