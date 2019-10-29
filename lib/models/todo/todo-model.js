'use strict';

const Model = require('../model.js');
const schema = require('./todo-schema.js');

/**
 * @class Todo
 */
class Todo extends Model {
  /**
   * @param {object} schema - A mongoose model to use as a schema for this data type 
   */
  constructor() {
    super(schema);
  }
}

module.exports = Todo;
