class ClientError extends Error {
  private status: number;

  private isLogged: boolean;

  constructor(message = 'client error', code = 400, isLogged = true) {
    super(message);
    this.status = code;
    this.isLogged = isLogged;
  }
}

class ServerError extends Error {
  private status: number;

  private isLogged: boolean;

  constructor(message = 'server error', code = 500, isLogged = true) {
    super(message);
    this.status = code;
    this.isLogged = isLogged;
  }
}

export {
  ClientError,
  ServerError,
};
