require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const { PORT, MONGO_DB } = require('./utils/config');
const { responseHandler } = require('./middlewares/responseHandler');

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

app.use(router);

app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`app listening port: ${PORT} `);
});
