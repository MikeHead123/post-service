class ClientError extends Error {
  constructor(code = 500, message, isLogged = true) {
    super(message);
    this.status = code;
    this.isLogged = isLogged;
  }
}

module.exports = ClientError;
