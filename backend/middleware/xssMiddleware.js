const xss = require('xss');

/**
 * @desc    Sanitize user input to protect against XSS
 */
const sanitize = (val) => {
    if (typeof val === 'string') {
        return xss(val);
    }
    if (typeof val === 'object' && val !== null) {
        for (let key in val) {
            val[key] = sanitize(val[key]);
        }
    }
    return val;
};

const xssMiddleware = (req, res, next) => {
    if (req.body) {
        req.body = sanitize(req.body);
    }
    if (req.query) {
        req.query = sanitize(req.query);
    }
    if (req.params) {
        req.params = sanitize(req.params);
    }
    next();
};

module.exports = xssMiddleware;
