var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var app = express()

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

    app.listen(5000, 'localhost')
  } catch (err) {
    console.log(err)
  }
}

start()

module.exports = app
