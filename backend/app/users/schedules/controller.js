const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  bcrypt = require("bcrypt"),
  { validationResult } = require("express-validator"),
  querys = require("./querys"),
  tokenManager = require(path.join(rootDir, "util", "auth", "token"));

exports.newSchedule = async (req, res, next) => {
  {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error("Error de validación.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      console.log(req.userId);
      let answer = await querys.newSchedule(req.userId, req.body);
      if (answer !== null) {
        res.status(201).json(answer);
        return;
      }

      const error = new Error("El horario no tiene el formato esperado");
      error.statusCode = 400;
      throw error;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
