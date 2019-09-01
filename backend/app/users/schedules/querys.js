const mongodb = require("mongodb");
const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, "util", "db", "mongo")).db(),
  users = db.collection("users");

exports.newSchedule = async (userId, newSchedule) => {
  let user = await users.findOne({ _id: mongodb.ObjectId(userId) });

  let schedules = user.schedules;
  console.log(user.schedules);
  if (!schedules) schedules = [];
  if (schedules.some(el => el.title === newSchedule.title)) return null;

  console.log(schedules, newSchedule);
  schedules.push(newSchedule);
  console.log(schedules);
  return users.findOneAndUpdate(
    { _id: mongodb.ObjectId(userId) },
    { $set: { schedules: schedules } },
    { timestamps: true }
  );
};
