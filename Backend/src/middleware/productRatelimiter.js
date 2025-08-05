import rateLimit from 'express-rate-limit';

export const productRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // max requests per 5 minutes
    message: 'Too many requests, please try again later',
    // Skip rate limiting for admins
    skip: (req, _res) => {
        // If user is authenticated and is admin, skip rate limiting
        return req.user && req.user.Role === 'admin';
    },
});