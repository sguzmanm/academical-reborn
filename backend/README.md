## Libs

- cheerio
- express
- node-schedule

## Setup

With npm installed go to the backend folder and type:

```
npm install
```

When libs are installed:

```
npm start
```

The app should be running at port 3000

## Scrapper

```
cd scrapper
node cultural-events.js <Num of weeks> <Hour interval for running the scrapper>
```
<<<<<<< HEAD

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
  "id":"String, title.toUpperCase()+dateStart+dateEnd",
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
  "indexStart": "Int ranging from 0 to the lastGridUnit",
  "timeStart":"String in hh:mm",
  "indexEnd": "Int ranging from 0 to the lastGridUnit",
    "timeEnd": "String in hh:mm",
  "geolocation":"Lat,long",
  "place":"String",
  "days":"Array Number ranging from 0 to 5"
}
```
=======
>>>>>>> cultural-events-scrapper
