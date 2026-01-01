const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            // Only send response if it hasn't been sent already
            if (!res.headersSent) {
                // Handle ApiErrors which use statuscode, or regular errors
                const statusCode = error.statuscode || error.statusCode || 500;
                res.status(statusCode).json({
                    success: false,
                    message: error.message || "Something went wrong"
                });
            } else {
                // If response already sent, pass error to Express error handler
                if (typeof next === 'function') {
                    next(error);
                }
            }
        }
    };
};

export {asyncHandler};