const { STATUS_CODE_CONFLICT } = require('../utils/constants');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE_CONFLICT;
  }
};
