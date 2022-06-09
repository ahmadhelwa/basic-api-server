"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");

const app = express();

const notFoundHandler = require("./error-handlers/404");

const errorHandler = require("./error-handlers/500");

const foodRouter = require("./routes/food.route");

const clothesRouter = require("./routes/clothes.route");

const logger = require("./middleware/logger");

app.use(express.json());

app.use(foodRouter);

app.use(clothesRouter);

app.use(logger);

app.use(errorHandler);

app.use("*", notFoundHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(` server is start in port ${PORT}`);
  });
}

module.exports = {
  start: start,
  app: app,
};
