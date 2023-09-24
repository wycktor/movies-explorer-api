const { STATUS_CODE_UNAUTHORIZED } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE_UNAUTHORIZED;
  }
};
