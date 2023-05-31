/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-unresolved
const userRouter = require('./routes/userRouter');
const cardsRouter = require('./routes/cardRouter');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    // eslint-disable-next-line comma-dangle
    _id: '647756bd85d90546a56b9889'
  };

  next();
});

app.use(userRouter);
app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`app listening port: ${PORT} `);
});
