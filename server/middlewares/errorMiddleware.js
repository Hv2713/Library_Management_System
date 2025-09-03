class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  console.log(err);

  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `User already exists`;
    err = new ErrorHandler(err.message, err.statusCode);
  }

  if (err.name === "JsonWebTokenError") {
    const statusCode = 400;
    const message = `Json Web Token is Invalid, Try Again`;
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name === "TokenExpiredError") {
    const statusCode = 400;
    const message = `Json Web Token is Expired, Try Again`;
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name === "CastError") {
    const statusCode = 400;
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, statusCode);
  }

  ["Name is required", "Email is required", "Password is required"];

  const errorMessage = err.erros
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
    });
};

export default ErrorHandler;