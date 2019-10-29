'use strict';

const Model = require('../model.js');
const schema = require('./todo-schema.js');

// TODO: JSDoc Comment
class Todo extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Todo;
