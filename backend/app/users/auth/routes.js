const express = require('express'),
  path = require('path'),
  rootDir = path.dirname(process.mainModule.filename),
  userController = require('./controller')

const handlerExceptions = require(path.join(
  rootDir,
  'util/errors',
  'handlerException'
))
const router = express.Router()

//Get users
router.get(
  '',
  handlerExceptions(userController.getAll)
)

module.exports = router

