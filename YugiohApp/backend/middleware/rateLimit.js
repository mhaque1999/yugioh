const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1000, 
    max: 20, 
    message: 'Rate limit exceeded. Please try again later.'
});

module.exports = apiLimiter;
