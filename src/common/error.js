class ClientError extends Error {
  constructor(message = 'server error', code = 500, isLogged = true) {
    super(message);
    this.status = code;
    this.isLogged = isLogged;
  }
}

module.exports = ClientError;
