# Academical-reborn

This app allows people to plan their schedule based on custom events and cultural events offered by the Los Andes University.

## Colaborators

- Carlos Mario Sarmiento

  [Página](https://korkies22.github.io/Portfolio/) -  [GitHub](https://github.com/korkies22/)

- El Checho

  [Página](https://viviangomezcubillos.herokuapp.com) - [GitHub](https://github.com/VivianGomez) 

## Links

**Desplegada en:** https://www.heroku.com/

## Description

With Academical Reborn people from the Los Andes University can get to know which events the university offers and plan them into their schedule.
The person must register in the system. Later, the person can create schedules and for each schedules he/she can add events.
The events are composed by a name, description and a date. The events are shown in the callendar by hovering and added by clicking on them. If the event crosses with one another, the hovered event shows a red background.
The person can switch between weeks to be able to see which events he has included. He can also switch between schedules to be able to see the events in each of them.

## Objective

We want to allow people to be able to know which cultural events the university offers, and plan them within their schedule.

## Tecnologies used

This proyect was developed using the MERN stack.

- **Mongo DB**: MongoDB was used as a NOSQL database. Here users,schedules and events are stored.
- **Express**: A fast, minimalistic and flexible framework for Node.js, it allows route handling in an easy way. https://expressjs.com/es/
- **React JS**: A Front End library useful for creating components. https://reactjs.org/
- **Node JS**: A javascript environment which allows to create a web server with javascript. https://nodejs.org

Some extra dependencies were included in the project:

- **Back End**
- Moongose JS
- Body Parser
- BCrypt Node JS
- JSON Web TokeN
- React-router-dom
- Bootstrap

- **Back End**
- Moongose JS
- Body Parser
- BCrypt Node JS
- JSON Web TokeN
- React-router-dom
- Bootstrap

All of these can be found in the respective package.json files in the backend and frontend folders.

The application is deployed in https://heroku.com/ 

## Instructions to execute

### Requisites

- **Node JS**

Verify that nodejs is installed by running "node -v" on terminal or cmd. It can be downloaded in https://nodejs.org/ (versión LTS)

### Steps to run develop version

1. Configure a .env file with the respective properties. The properties that must be included are:
- privateKey: And RSA private key in order to build the tokens
- publicKey: And RSA public key which is the counter part of the private key
- publicKey: And RSA public key which is the counter part of the private key
- maxWeeks
- hourInterval
- timeStart
- rangeMinutes
- scrapper
- dbUser
- dbPassword
- dbHost
2. Abrir la carpeta raíz en un CMD.
3. Ejecutar "npm install" para instalar todas las dependencias necesarias.
4. Ejecutar "npm run dev" si se cuenta con Nodemon o ejecutar "npm start".
   4.1) Tener en cuenta que la base de datos configurada en el repositorio no es la base de datos real. Es una que hace referencia a una instancia local de MongoDB.
5. Abrir otro CMD en la raíz del proyecto y acceder a la carpeta "client".
6. Instalar las dependencias necesarias con "npm i".
7. Correr el comando "npm start"
8. La aplicación será abierta de forma automática en http://localhost:3000/

El servidor del back quedará corriendo en http://localhost:8080

### Probar con datos de producción

Con el fin de poder probar la aplicación con la base de datos de producción, se debe editar el archivo "env.js" encontrado en la raíz del proyecto en la sección de "development", y modificar la variable de "databaseUri" por la uri que apunta a la base de datos de producción. **LA URI DE PRODUCCIÓN NO SE DEBE SUBIR AL REPOSITORIO**
