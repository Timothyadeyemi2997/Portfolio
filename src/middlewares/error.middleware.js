// src/middlewares/error.middleware.js

/**
 * Global Error Handler Middleware
 * This catches all errors from controllers/services
 * and formats them into clean API responses.
 */

const errorHandler = (err, req, res, next) => {
  // Default status code (500 = server error)
  let statusCode = err.statusCode || 500;

  let message = err.message || "Something went wrong";

  // 🧠 Handle Mongoose bad ObjectId errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // 🧠 Handle duplicate key errors (MongoDB unique fields)
  if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue || {})[0];

    message = `${field} already exists`;
  }

  // 🧠 Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;

    const errors = Object.values(err.errors).map(
      (val) => val.message
    );

    message = errors.join(", ");
  }

  // 🧠 Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // 📦 Final response
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;