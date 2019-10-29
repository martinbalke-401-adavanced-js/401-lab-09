'use strict';

const mongoose = require('mongoose');

//Creating the moongoose schema to define this data types ruleset
const categories = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

//Creating a virtual to refernce the todo collection, matching name to todo's category field
categories.virtual('tasks', {
  ref: 'todo',
  localField: 'name',
  foreignField: 'category',
  justOne: false
});

/**
 * Populate the tasks virtual
 * @throws {Error} - Unable to find matching tasks
 */
const populateTasks = function() {
  try {
    this.populate('tasks');
  } catch (e) {
    console.error('Find Error', e);
  }
};

//Pre query middleware, before using find the populate tasks function will be called
categories.pre('find', populateTasks);

//Wrap this schema inside of a mongoose model so we can use mongoose functions and validation on it
module.exports = mongoose.model('categories', categories);
