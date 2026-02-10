
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.is_success = statusCode < 400;
    this.data = data;
  }
}

export { ApiResponse };
