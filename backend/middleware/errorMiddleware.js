// Route Not Found
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  
  res.status(404);
  next(error);
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  console.log("=========== ERROR ===========");
  console.log("Message:", err.message);
  console.log("Status:", err.response?.status);
  console.log("Response:", err.response?.data);
  console.log("Code:", err.code);
  console.log("URL:", err.config?.url);
  

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};