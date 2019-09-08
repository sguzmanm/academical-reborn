## Libs

- react: Frontend library of the project
- react-dom: Dependency needed by react
- react-scripts: Dependency needed by react
- redux: State management solution for this project
- react-redux: Dependency needed to use redux in react
- react-router-dom: Router solution used for this project
- react-flatpickr: Library used to let people choose a date and time in a material-style like callendar
- axios: Package used to handle http request
- node-sass: Sass compiler used to compile .scss files

## Setup: Run the app

Open a terminal or cmd in the frontend folder and run:

```
npm install
```

When libs are installed, run the next command for making the frontend run in development mode:

```
npm start
```


The app should be running at port 3000, this is made for developing. Once the app is ready for production run:

```
npm run build
```

This will generate a dist folder with the production ready version of the frontend. The contents of this folders must be copied into the public folder found in the root folder of the backend folder and later run the backend in production mode

## Folder structure

- src: Contains the code developed for the application
  - app: Contains the app component. This is the main component of the app
  - assets: Contains main assets of the project: icons, images, etc.
  - components: Contains all app components besides app itself
  - css: Contains global sass file for the page
  - pages: Components which store the main component of each page. Currently: login and schedule
  - store: Folder to configure everything about the store: reducers, actions, state, etc. Currently auth, events, schedules and current week are managed in the store
  - util: common js functions used throughout the app are stored here: auth and localStorage related functions, week related functions, hash from string to number for types of events function and constants for the grid
  - index.js: Main file needed for react to build the SPA
 - public: Where the production ready app is located in order to be copied to the backend
