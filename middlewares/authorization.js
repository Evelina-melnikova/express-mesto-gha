// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');

// eslint-disable-next-line import/extensions, import/no-unresolved
const NotAuthorizate = require('../utils/NotAuthorizate');

// eslint-disable-next-line func-names, consistent-return
module.exports = function (req, res, next) {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new NotAuthorizate('С токеном что-то не так');
    }
    const validToken = token.replace('Bearer ', '');
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(validToken, 'dev_secret');
  } catch (error) {
    next(new NotAuthorizate('С токеном что-то не так'));
  }
  req.user = payload;
  next();
};
