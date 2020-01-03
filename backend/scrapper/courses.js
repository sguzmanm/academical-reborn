const data=require("./courses-data.json");
require("dotenv").config();
const defaultDays = ["l", "m", "i", "j", "v", "s"];
const fs = require('fs');
const answer=[];
//------------
// HELPERS
//------------

//Calculate index for the given time frame
function calculateIndex(time) {
  if(time===null)
  {
      return null;
  }
  let data = time.split(":");
  let currentTime = parseInt(data[0], 10) * 60 + parseInt(data[1], 10);
  let rangeMinutes = parseInt(process.env.rangeMinutes, 10);
  let timeStart = parseInt(process.env.timeStart, 10);
  return Math.floor((currentTime - timeStart) / rangeMinutes);
}

const parseCourse=(course)=>{
  let newCourse,startDate,endDate,startTime,endTime,days;
  newCourse={
      title: course.class+"-"+course.course+":"+course.title,
      code: course.nrc,
      credits:course.credits,
      limit:course.maxenrol,
      enrolled:course.enrolled,
      term:course.term,
      type: course.ptrmdesc,
      campus: course.campus,
      description: course.instructors && course.instructors.length>0?course.instructors.reduce((a,b)=>{return a.name+","+b.name}):"No hay profesores registrados",
  };

  course.schedules.forEach((schedule,index)=>{
      startDate=null;
      endDate=null;
      startTime=schedule.time_ini?schedule.time_ini.slice(0,2)+":"+schedule.time_ini.slice(2,4):null;
      endTime=schedule.time_fin?schedule.time_fin.slice(0,2)+":"+schedule.time_fin.slice(2,4):null;
      if(startTime)
      {
        startDate=new Date(schedule.date_ini);
        startDate.setHours(parseInt(startTime.split(":")[0],10));
        startDate.setMinutes(parseInt(startTime.split(":")[1],10));  
      }

      if(endTime){
        endDate=new Date(schedule.date_fin);  
        endDate.setHours(parseInt(endTime.split(":")[0],10));
        endDate.setMinutes(parseInt(endTime.split(":")[1],10));  
      }

      newCourse={
          ...newCourse,
          place:schedule.building+":"+schedule.classroom,
          dateStart: startDate,
          dateEnd: endDate,
          timeStart:startTime,
          timeEnd:endTime,
          indexStart:calculateIndex(startTime),
          indexEnd:calculateIndex(endTime),
      }
      days=[];
      let keyDayMessage="";
      defaultDays.forEach((day,index)=>{
        if(schedule[day] && schedule[day]!==null){
            days.push(index);
            keyDayMessage+=index+"-";
        }
      })
      newCourse.days=days;
      newCourse._id=newCourse.code+"-"+index+"D"+keyDayMessage;
      answer.push(newCourse);
  })
}

data.forEach((course,index)=>{
    parseCourse(course)
    if(index%100===0)
    {
        console.log(index +" out of "+data.length);
    }
});

fs.writeFile('./my-courses.json', JSON.stringify(answer), 'utf8', ()=>{
    console.log("Done");
});







