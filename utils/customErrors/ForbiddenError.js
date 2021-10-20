module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.code = 403;
  }
};
