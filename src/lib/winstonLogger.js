const winston = require("winston");

// Create a logger that only uses console transport
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const loggerHttp = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const httpLogger = (req, res, next) => {
  const start = Date.now();
  // console.log("-----------Enter Logger-----", req.url, req.body, req.query);
  res.on("finish", () => {
    const duration = Date.now() - start;
    loggerHttp.info(
      `API Requested: ${req.method} ${req.url} | Status: ${
        res.statusCode
      } |user:${JSON.stringify(req.user || {})}|query:${JSON.stringify(
        res.query || {}
      )}|body:${JSON.stringify(req.body || {})}| Execution Time: ${duration}ms`
    );
  });
  next();
};

const writeLog = (funcName, message, level = "error", stack = null) => {
  if (level === "error") {
    logger.log({
      level: level,
      funcName: funcName,
      message: message,
      stack: stack,
      LocalDateNTime: new Date().toLocaleString(),
    });
  } else {
    logger.log({
      level: level,
      funcName: funcName,
      message: message.toString(),
      LocalDateNTime: new Date().toLocaleString(),
    });
  }
};

module.exports = { writeLog, httpLogger };
