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
        body("collegeEvents").custom(events => {
          let errMsg = validateEvents(events);
          if (errMsg) {
            return Promise.reject(errMsg);
          }
          return Promise.resolve("OK");
        })
      ];
    }
  }
};

const validateEvents = events => {
  if (!events) return true;
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    if (event.indexStart > event.indexEnd) {
      return "Las horas de inicio y fin del evento no concuerdan";
    }
    for (let j = i + 1; j < events.length; j++) {
      let el = events[j];

      if (el.location === event.location && el.indexStart > event.indexStart) {
        return `El evento ${j} con nombre ${el.title} se intercepta con el evento ${i} con nombre ${event.title}`;
      }
      if (
        el.location === event.location &&
        el.indexStart <= event.indexStart &&
        el.indexEnd <= event.indexEnd
      ) {
        return `El evento ${j} con nombre ${el.title} se intercepta con el evento ${i} con nombre ${event.title}`;
      }
    }
  }
  return;
};
