'use strict';

const Model = require('../model.js');
const schema = require('./products-schema.js');

// TODO: JSDoc Comment
class Products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Products;
