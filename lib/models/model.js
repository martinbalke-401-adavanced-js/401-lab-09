'use strict';

// TODO: JSDoc Comment
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  // TODO: JSDoc Comment
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  // TODO: JSDoc Comment
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  // TODO: JSDoc Comment
  create(record) {
    console.log('r', record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  // TODO: JSDoc Comment
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  // TODO: JSDoc Comment
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
