const express = require("express"),
  path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  eventController = require("./controller"),
  { validate } = require("./validator");

const handlerExceptions = require(path.join(
  rootDir,
  "util/errors",
  "handlerException"
));
const router = express.Router();

router.post(
  "/",
  validate("schedule"),
  handlerExceptions(eventController.newSchedule)
);

module.exports = router;
