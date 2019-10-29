'use strict';

const mongoose = require('mongoose');

//Creating a schema to use as the rule set for our products data
const products = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

//Wrapping our schema inside of a mongoose model and exporting that to use in our class
module.exports = mongoose.model('products', products);
