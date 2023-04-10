class ClientError extends Error {
  private status: number;

  private isLogged: boolean;

  constructor(message = 'server error', code = 500, isLogged = true) {
    super(message);
    this.status = code;
    this.isLogged = isLogged;
  }
}

export default ClientError;
