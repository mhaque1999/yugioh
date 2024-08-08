const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 20, // 20 requests per second
    message: 'Rate limit exceeded. Please try again later.'
});

module.exports = apiLimiter;
