const https = require("https");
const cheerio = require("cheerio");

const BASE_PATH = "https://decanaturadeestudiantes.uniandes.edu.co";
const URL = "/index.php/es/eventos-de-la-semana/week.listevents/2019/08/31";

let events = [];

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

function parseMonth(month) {
  return months.indexOf(month);
}

const scrapeEventsCulturalWebpage = (url, cb) => {
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

function parseEventList(html) {
  const $ = cheerio.load(html);
  events = [];
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

    if (isEventOk(ev)) events.push(ev);
  });

  events.forEach((el, index) => {
    scrapeEventsCulturalWebpage(el.link, html => parseEvent(index, html));
  });
}

function parseEvent(index, html) {
  const $ = cheerio.load(html);
  let ev = events[index];
  let time = $(".ev_detail.repeat")
    .text()
    .split(",");
  let completeDay = time[1].trim().split(" ");

  ev.weekDay = time[0];
  ev.day = completeDay[1];
  ev.month = parseMonth(completeDay[0]);
  ev.hour = time[3];

  let hourPassed = false;

  $("tr[align=left] td table tbody tr td p").each((idx, el) => {
    let text = $(el).html();

    if (!text.includes("<strong>") && !hourPassed) return;

    if (text.includes("<strong>")) {
      let strong = text.split("<strong>");
      for (let i = 1; i < strong.length; i++) {
        let split = strong[i].split("</strong>");
        if (split[0] === "Lugar:") {
          ev.place = split[1].trim().replace(new RegExp("<br>", "g"), "");
        }
        if (!hourPassed && split[0] !== "Hora:") continue;

        ev.description = split[1]
          .split(".m.")[1]
          .replace(new RegExp("<br>", "g"), "");
        break;
      }
    }
  });

  console.log(ev);
  return ev;
}

function isEventOk(event) {
  return event.title && event.type && event.link;
}

scrapeEventsCulturalWebpage(URL, html => parseEventList(html));
