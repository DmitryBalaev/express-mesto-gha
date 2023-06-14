require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { responseHandler } = require('./middlewares/responseHandler');

const { PORT = 5500, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use(router);

app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`app listening port: ${PORT} `);
});
