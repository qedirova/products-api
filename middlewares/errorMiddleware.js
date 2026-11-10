export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.log(err);

  res.status(statusCode).json({
    success: false,
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
};
