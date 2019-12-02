'use strict';

require('dotenv').config();

//Requiring in the start function for our server and running it on
//the port specified in .env variables
require('./lib/server.js').start(process.env.PORT);
