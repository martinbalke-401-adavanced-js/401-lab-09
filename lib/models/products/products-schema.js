'use strict';

const mongoose = require('mongoose');

// TODO: Comment
const products = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

// TODO: Comment
module.exports = mongoose.model('products', products);
