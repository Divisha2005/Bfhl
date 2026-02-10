
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.is_success = false;
  }
}

export { ApiError };
