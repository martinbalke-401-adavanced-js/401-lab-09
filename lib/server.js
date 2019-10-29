'use strict';

// Get the current working directory for the application
const cwd = process.cwd();

// Prepare the Express app
const express = require('express');
const app = express();

// External Resources
const mongoose = require('mongoose');
const errorHandler = require(`${cwd}/lib/middleware/500.js`);
const notFound = require(`${cwd}/lib/middleware/404.js`);
const router = require(`${cwd}/lib/router.js`);

//Enabling the JSON parser middleware for incoming request bodies to the server
app.use(express.json());

//Enabling the Urlencoder middleware for parsing urlencoded request bodies
app.use(express.urlencoded({ extended: true }));

//Enabling our routes and all of their endpoints located in router.js 
app.use(router);

//Declaring middleware to handle 404 and 500 server errors
app.use(notFound);
app.use(errorHandler);

/**
 * Function start
 * Exported and used to initialize our server connection as well
 * as our mongoose database connection
 * @param {number} port - The port on which to run our server
 */
const start = port => {
  app.listen(port || process.env.PORT || 3000, () => {
    console.log(`Server Running on Port ${port || process.env.PORT || 3000}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.MONGODB_URI, config);
};

module.exports = { server: app, start: start };
