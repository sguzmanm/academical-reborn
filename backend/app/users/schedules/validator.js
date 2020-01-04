const { body } = require("express-validator");
exports.validate = method => {
  switch (method) {
    case "schedule": {
      return [
        body("title", "Su horario debe tener un nombre definido")
          .exists()
          .not()
          .isEmpty()
          .withMessage("El formato del título no es válido"),
        body("collegeEvents").custom(async events => {
          if(!events || events.length===0){
            return Promise.resolve("OK");
          }

          let errMsg = validateEvents(events);
          if (errMsg) {
            return Promise.reject(errMsg);
          }

          events.forEach((event,i)=>{
            for(let j=i+1;j<events.length;j++){
              errMsg=validateTime(event,events[j]);
              if (errMsg) {
                return Promise.reject(errMsg);
              }
            }  
          });
          return Promise.resolve("OK");
        }),
        body("courses")
        .custom(courses => {
          if(!courses){
            return true;
          }
          
          let errMsg = validateEvents(courses);
          if (errMsg) {
            console.log(errMsg);
            return false;
          }
          return true;
        })
        .withMessage("Error en la validación de contenido de cursos")
        .custom(courses=>{
          if(!courses){
            return true;
          }

          for(let i=0;i<courses.length;i++){
            for(let j=i+1;j<courses.length;j++){
              errMsg=validateTime(courses[i],courses[j]);
              if (errMsg) {
                console.log(errMsg);
                return false;
              }
            }  
          }
          
          return true;
        })
        .withMessage("Error en la validación de sobrelapamiento de cursos")
      ];
    }
  }
};

const validateTime=(event,el)=>{
  console.log(event.code,"VS",el.code);
  if(el.location!==event.location)
    return;

  let eventDates=[new Date(event.startDate),new Date(event.endDate)]
  let elDates=[new Date(el.startDate),new Date(el.endDate)]

  console.log(elDates,eventDates);
  if(elDates[1]<=eventDates[0] || elDates[1]>=eventDates[1]){
    return;
  }

  console.log("possible overlap");
  // eslint-disable-next-line no-unused-vars
  for(const day of event.days){
    console.log("DAYS",el.days.indexOf(day),!(event.indexEnd<=el.indexStart || event.indexStart>=el.indexEnd)); 
    // eslint-disable-next-line no-unused-vars
    if (el.days.indexOf(day)!==-1 && !(event.indexEnd<=el.indexStart || event.indexStart>=el.indexEnd))
    {
      return `El evento con nombre ${el.title} se cruza con el evento con nombre ${event.title} el día ${day+1} de la semana`;
    }
  }
}

const validateEvents = events => {
  if (!events) return;
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    if (event.indexStart > event.indexEnd) {
      return "Las horas de inicio y fin del evento no concuerdan";
    }
    for (let j = i + 1; j < events.length; j++) {
      let el = events[j];

      if(event._id && el._id && event._id===el._id)
        return "Los eventos son idénticos"
        
      el.days.forEach(day => {
        if(event.days.indexOf(day)!=-1)
        {
          let err=validateTime(el,event)
          if(err)
            return err;
        }
      });
      
    }
  }
  return;
};
