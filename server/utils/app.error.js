class AppError extends Error {
  constructor(info, statusCode, optional) {
    super(info);

    this.statusCode = info.statusCode || statusCode;
    this.statusMessage = `${this.statusCode}`.startsWith('4')
      ? 'fail'
      : 'error';
    this.optional = optional;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
