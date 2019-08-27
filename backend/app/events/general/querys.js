const path = require('path'),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, 'util', 'db', 'mongo')).db(),
  events = db.collection('events')


exports.findAll = async () => {
  return await events.find().toArray()
}
