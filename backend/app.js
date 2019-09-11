const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const app = express();

app.use(require("cors")());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

start = async () => {
  try {
    await require("./util/db/mongo").mongoConnect(
      process.env.dbUser,
      process.env.dbPassword,
      process.env.dbHost
    );

    require("./app/router")(app);
    require("./util/errors/exceptionMiddleware")(app);

    if (process.env.scrapper === "1") {
      const culturalScrapper = require("./scrapper/cultural-events");
      culturalScrapper.scrapeEventsCulturalWebpage(
        culturalScrapper.URL + culturalScrapper.formatDate(new Date()),
        html => culturalScrapper.parseEventList(html)
      );
    }

    app.listen(process.env.PORT || 4000, "localhost");
  } catch (err) {
    console.log(err);
  }
};

start();

module.exports = app;
