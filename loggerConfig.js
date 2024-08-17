const winston = require("winston");
require("winston-daily-rotate-file");
const Graylog2 = require("winston-graylog2");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};

winston.addColors(colors);

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const graylogTransport = new Graylog2({
  name: "Graylog",
  level: "debug",
  graylog: {
    servers: [{ host: "localhost", port: 12201 }],
  },
  staticMeta: { env: "production" },
});

const logger = winston.createLogger({
  levels,
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.colorize(),
  ),
  transports: [
    new winston.transports.Console(),
    dailyRotateFileTransport,
    graylogTransport,
  ],
});

module.exports = logger;