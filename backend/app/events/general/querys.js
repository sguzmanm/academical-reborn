const path = require('path'),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, 'util', 'db', 'mongo')).db(),
  users = db.collection('users')


exports.findAll = async () => {
  return await users.find()
}
