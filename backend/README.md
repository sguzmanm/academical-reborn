## Libs

- cors
- cheerio
- dotenv
- express
- express-validator
- jsonwebtoken
- mongodb
- nodemon
- node-schedule

## Setup

We are using environment variables in node throught a .env file. This contains the following fields:

- privateKey: Generated from http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
- publicKey: Generated from http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/

Both of privateKey and publicKey are necessary to generate our own jwt tokens for sign up and log in operations.

Now then, with npm installed go to the root and type:

```
npm install
```

When libs are installed:

```
npm start
```

The app should be running at port 3000

## Folder structure

- app: Contains the routes for the app and all operations over each collection
- bin: www.js main config for the app
- scrapper: Contains js files for scrappers to be ran over certain periods of time
- util: COmmon features for the app, including auth, db and errors management
- app.js: Main app connection

## Scrapper

```
cd scrapper
node cultural-events.js <Num of weeks> <Hour interval for running the scrapper>
```

## Models

### Users

```
{
  "id":"email",
  "email":"String",
  "username":"String",
  "password":"String, encrypted",
  "schedules":"Array Schedule"
}
```

### Schedules

```
{
  "id":"Mongo default",
  "title":"String",
  "description":"String",
  "collegeEvents":"Array String (ID of Event)",
  "myEvents":"Array Event"
}
```

### Events

```
Event:{
  "id":"Mongo default",
  "title":"String",
  "description":"String",
  "type":"String",
  "rating":"Double",
  "ocurrence":"Ocurrence"
}

Ocurrence:{
  "id":"Mongo default",
  "dateStart":"Date",
  "dateEnd":"End",
  "indexStart": "Int ranging from 0 to the lastGridUnit, by half an hour",
  "timeStart":"String in hh:mm",
  "indexEnd": "Int ranging from 0 to the lastGridUnit, by hqlf an hour",
  "timeEnd": "String in hh:mm",
  "geolocation":"Lat,long",
  "place":"String",
  "days":"Array Number ranging from 0 to 5"
}
```
