// Libs
const https = require("https");
const cheerio = require("cheerio");
const schedule = require("node-schedule");
const path = require("path");
const rootDir = path.dirname(process.mainModule.filename),
  eventQueries = require(path.join(
    rootDir,
    "app",
    "events",
    "general",
    "querys"
  ));

require("dotenv").config();


//Vars
let events = [];
let maxWeeks = parseInt(process.env.maxWeeks, 10);
let weeks = maxWeeks;
let hourInterval = process.env.hourInterval;

// Consts
const BASE_PATH = "https://decanaturadeestudiantes.uniandes.edu.co";
const DEFAULT_TIME = 2;
const URL = "/index.php/es/eventos-de-la-semana/week.listevents/";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

//------------
// HELPERS
//------------

/**
 * Add days to the specified date.
 * sparebytes https://stackoverflow.com/questions/563406/add-days-to-javascript-date
 * @param {*} date
 * @param {*} days
 */
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Formats the date for the query
function formatDate(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

// Check if event is ok to add to list
function isEventOk(event) {
  return event.title && event.type && event.link;
}

//Calculate date object with given event
function calculateDate(year, month, day, hours) {
  let time = hours.split(":");
  let newDate = new Date();
  newDate.setFullYear(year, month, day);
  newDate.setHours(time[0], time[1]);
  return newDate;
}

//Calculate index for the given time frame
function calculateIndex(time) {
  let data = time.split(":");
  let currentTime = parseInt(data[0], 10) * 60 + parseInt(data[1], 10);
  let rangeMinutes = parseInt(process.env.rangeMinutes, 10);
  let timeStart = parseInt(process.env.timeStart, 10);
  return Math.floor((currentTime - timeStart) / rangeMinutes);
}

//-------------
// CODE
//-------------

// Makes a GET request with the given callback function
const scrapeEventsCulturalWebpage = (url, cb) => {
  console.log("SCRAPING ",BASE_PATH + url);
  https.get(BASE_PATH + url, res => {
    let html = "";

    res.on("data", chunk => {
      html += chunk;
    });

    res.on("end", () => {
      return cb(html);
    });
  });
};

// Retrieves the events list
const parseEventList = html => {
  const $ = cheerio.load(html);
  let ev;

  $(".article_column").each((idx, el) => {
    ev = {};
    ev.link = $(el)
      .find(".ev_link_row")
      .attr("href");

    ev.title = $(el)
      .find(".ev_link_row")
      .text();
    ev.type = $(el)
      .find(".event_text")
      .text();

    if (isEventOk(ev)) {
      events.push(ev);
    }
  });

  // if there are more weeks to look for, retreive the missing event list, else look for the event detail
  if (--weeks) {
    console.log("Weeks", 0);
    let date = new Date();
    date = addDays(date, (maxWeeks - weeks) * 7);
    scrapeEventsCulturalWebpage(URL + formatDate(date), html =>
      parseEventList(html)
    );
  } else {
    events.forEach((el, index) => {
      if (el.link)
        scrapeEventsCulturalWebpage(el.link, html => parseEvent(index, html));
    });
  }
};

// Retrieve the information of the event detail
const parseEvent = (index, html) => {
  const $ = cheerio.load(html);

  let time = $(".ev_detail.repeat")
    .text()
    .split(",");
  let completeDay = time[1].trim().split(" ");

  // General date setup
  let ev = events[index];
  ev.days = [days.indexOf(time[0].trim())];
  let day = completeDay[1];
  let month = months.indexOf(completeDay[0]);
  let year = time[2].trim();

  // Time setup
  let hours = time[3].trim().split("-");
  ev.timeStart = hours[0];
  ev.indexStart = calculateIndex(ev.timeStart);
  ev.dateStart = calculateDate(year, month, day, ev.timeStart);

  // Get end date and time
  if (hours[1]) {
    ev.timeEnd = hours[1];
  } else {
    let mins = hours[0].split(":");
    ev.timeEnd = parseInt(mins[0], 10) + DEFAULT_TIME + ":" + mins[1];
  }
  ev.indexEnd = calculateIndex(ev.timeEnd);
  ev.dateEnd = calculateDate(year, month, day, ev.timeEnd);
  delete ev.link;

  $("tr[align=left] td table tbody tr td p").each((idx, el) => {
    let text = $(el).html();

    // If no labels return
    if (!text.includes("<strong>")) return;

    let strong = text.split("<strong>");
    // loop the text with labels
    for (let i = 1; i < strong.length; i++) {
      let split = strong[i].split("</strong>");

      if (split[0] === "Lugar:") {
        ev.place = split[1].trim().replace(new RegExp("<br>", "g"), "");
      }

      if (split[0] !== "Hora:") continue;

      ev.description = split[1]
        .split(".m.")[1]
        .replace(new RegExp("<br>", "g"), "");

      break;
    }
  });
  insertEvent(ev);
};

function insertEvent(event) {
  eventQueries
    .updateByTitleAndDate(event)
    .then(res => console.log(res))
    .catch(err => console.error(err));
  // TODO: Connect with mongo
}

//Second(OPTIONAL:0-59)    Minute(0-59)    Hour(0-23)    Day of month(1-31)    Month(1-12)    Day of week (0-7)
schedule.scheduleJob(`5 */${hourInterval} * * *`, function() {
  events = [];
  weeks = maxWeeks;
  scrapeEventsCulturalWebpage(URL + formatDate(new Date()), html =>
    parseEventList(html)
  );
});

exports.scrapeEventsCulturalWebpage = scrapeEventsCulturalWebpage;
exports.parseEventList = parseEventList;
exports.parseEvent = parseEvent;
exports.URL = URL;
exports.formatDate = formatDate;
