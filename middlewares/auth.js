const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload = {};

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (_) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  req.user = payload;

  return next();
};
