const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const app = express()

app.use(require('cors')())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

start = async () => {
  try {
    await require('./util/db/mongo').mongoConnect()

    require('./app/router')(app)
    require('./util/errors/exceptionMiddleware')(app)

    app.listen(3000, 'localhost')
  } catch (err) {
    console.log(err)
  }
}

start()

module.exports = app
