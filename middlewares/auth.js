const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const { Unauthorized } = require('../utils/responsesErrors/Unauthorized');

const handleError = (req, res, next) => {
  next(new Unauthorized('С токеном что-то не так.'));
};

// eslint-disable-next-line consistent-return
module.exports = function uathMiddleware(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) return handleError(req, res, next);
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return handleError(req, res, next);
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return handleError(req, res, next);
  }

  req.user = payload;

  next();
};
