const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = async () => {
  return await new Promise((resolve, reject) => {
    MongoClient.connect(
      'mongodb+srv://academical:web@uniandes2019.@academical-reborn-tkjum.mongodb.net/academical?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
      .then(client => {
        console.log('Connected!')
        _db = client.db()
        resolve(_db)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  })
}

const db = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.db = db
