const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    message: "Too many Login attempts from this IP",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many Requests ! ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log",
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
