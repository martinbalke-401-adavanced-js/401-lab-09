'use strict';

const Model = require('../model.js');
const schema = require('./categories-schema.js');

/**
 * @class Categories - Extends the Model class and passes the mongoose model as a schema
 */
class Categories extends Model {
  /**
   * @param schema - The mongoose model schema for this class of data
   */
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
