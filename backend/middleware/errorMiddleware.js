// Route Not Found
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  
  res.status(404);
  next(error);
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.log("error -> ",err.message)
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.stack,
  });
};