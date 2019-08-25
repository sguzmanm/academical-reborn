const https = require("https");
const cheerio = require("cheerio");

const URL =
  "https://decanaturadeestudiantes.uniandes.edu.co/index.php/es/eventos-de-la-semana/week.listevents/2019/08/31";

const scrapeEventsCulturalWebpage = cb => {
  https.get(URL, res => {
    let html = "";

    res.on("data", chunk => {
      html += chunk;
    });

    res.on("end", () => {
      const result = parse(html);
      cb(result);
    });
  });
};

function parse(html) {
  const $ = cheerio.load(html);
  let events = [];
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
  return events;
}

function isEventOk(event) {
  return event.title && event.type && event.link;
}

scrapeEventsCulturalWebpage(result => console.log(result));
