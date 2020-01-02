/*
_id:5d6b0473aa81cfb0ae52177d -- SAME
description: Instructors --instructors
code: null --nrc
title:Orquesta de los Andes -- title
dateEnd:2019-09-24T21:00:41.529+00:00 (Date) -- date_ini/date_fin on schedule
dateStart:2019-09-24T19:00:41.529+00:00 (Date) -- date_ini/date_fin on schedule
days:Array -- 0-l,1-m,2-i,3-j,4-v,5-s
indexEnd:30 --time_fin
indexStart:26 --time_ini
place:Auditorio Mario Laserna -- building: classroom
timeEnd:21:00 --time_fin
timeStart:19:00 --time_ini
type:Grupos institucionales --ptrmdesc
*/

let ObjectId = require("mongodb").ObjectID;
const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, "util", "db", "mongo")).db(),
  users = db.collection("users");

  exports.findAll = async (userId) => {
    let mongoId = 0;
    try {
      mongoId = ObjectId(userId);
    } catch (e) {
      return null;
    }
    let user = await users.findOne({ _id: mongoId });

    let schedules = user.schedules;
    if (!schedules) schedules = [];
    return schedules
  }

exports.newSchedule = async (userId, newSchedule) => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }
  let user = await users.findOne({ _id: mongoId });

  let schedules = user.schedules;
  if (!schedules) schedules = [];
  if (schedules.some(el => el.title === newSchedule.title)) return null;

  newSchedule._id = ObjectId();
  schedules.push(newSchedule);
  schedules.forEach(schedule => {
    if (schedule.collegeEvents) {
      schedule.collegeEvents.forEach(event => {
        if(!event._id)
          event._id = new ObjectId();
      });
    }

    if (schedule.courses) {
      schedule.courses.forEach(course=>{
        if(!course._id)
          course._id = new ObjectId();
      })
    }
  });

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: schedules } },
    { returnOriginal:false, timestamps: true }
  );
};

exports.updateSchedule = async (userId, scheduleId, newSchedule) => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }

  let user = await users.findOne({ _id: mongoId });
  if (!users) return null;

  let schedules = user.schedules;
  if (!schedules) return null;

  let index = schedules.findIndex(el => {
    return el._id.equals(ObjectId(scheduleId));
  });

  if (index === -1) return null;

  newSchedule._id = ObjectId(scheduleId);
  schedules[index] = newSchedule;
  
  let events = schedules[index].collegeEvents;
  if (events) {
    events.forEach(event => {
      if(!event._id)
        event._id = new ObjectId();
    });
  }

  let courses = schedules[index].courses;
  if (courses) {
    courses.forEach(course=>{
      if(!course._id)
        course._id = new ObjectId();
    })
  }

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: schedules } },
    { returnOriginal:false, timestamps: true }
  );
};

exports.deleteSchedule = async (userId, scheduleId) => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  if (!users) return null;

  let schedules = user.schedules;
  if (!schedules) return null;

  let index = schedules.findIndex(el => {
    return el._id.equals(ObjectId(scheduleId));
  });
  if (index === -1) return null;

  schedules.splice(index, 1);

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: schedules } },
    { timestamps: true }
  );
};

exports.deleteAll = async userId => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  if (!users) return null;

  let schedules = user.schedules;
  if (!schedules) return null;

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: [] } },
    { timestamps: true }
  );
};
