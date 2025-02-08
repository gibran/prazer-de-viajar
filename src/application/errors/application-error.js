class ApplicationError extends Error {
  constructor(message, errorCode, httpCode, stack = null) {
    super(message);
    this.errorCode = errorCode;
    this.httpCode = httpCode;
    if (stack) {
      this.stack = stack;
    }
  }

  toJSON() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      httpCode: this.httpCode,
      stack: this.stack,
    };
  }
}

export { ApplicationError };
