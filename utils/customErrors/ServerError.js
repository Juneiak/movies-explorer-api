module.exports = class ServerError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
};
