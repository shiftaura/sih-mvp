// Wrap all async route functions with this so we don't need try-catch blocks everywhere
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode === 404 ? "NOT_FOUND" : "SERVER_ERROR",
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        }
    });
};

module.exports = { asyncHandler, errorHandler };