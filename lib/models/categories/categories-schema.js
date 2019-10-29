'use strict';

const mongoose = require('mongoose');

// TODO: Comment
const categories = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// TODO: Comment
categories.virtual('tasks', {
  ref: 'todo',
  localField: 'name',
  foreignField: 'category',
  justOne: false
});

// TODO: JSDoc Comment
const populateTasks = function() {
  try {
    this.populate('tasks');
  } catch (e) {
    console.error('Find Error', e);
  }
};

// TODO: Comment
categories.pre('find', populateTasks);

// TODO: Comment
module.exports = mongoose.model('categories', categories);
