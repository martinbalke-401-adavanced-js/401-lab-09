'use strict';

const Model = require('../model.js');
const schema = require('./products-schema.js');

/**
 * @class Products
 */
class Products extends Model {
  /**
   * @param schema - A mongoose model to use as a schema for this data type
   */
  constructor() {
    super(schema);
  }
}

module.exports = Products;
