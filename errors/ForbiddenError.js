const { STATUS_CODE_FORBIDDEN } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE_FORBIDDEN;
  }
};
