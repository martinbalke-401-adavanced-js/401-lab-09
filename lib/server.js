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

// TODO: Comment
app.use(express.json());

// TODO: Comment
app.use(express.urlencoded({ extended: true }));

// TODO: Comment
app.use(router);

// TODO: Comment
app.use(notFound);
app.use(errorHandler);

// TODO: JSDoc Comment
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
