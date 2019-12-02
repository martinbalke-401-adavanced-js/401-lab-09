'use strict';

/**
 * @class Model - Defines the model class for our basic data modeling
 */
class Model {
  /**
   * Create a model
   * @param {object} schema - The mongoose schema used for defining a model
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Invoking the package mongoose-schema-jsonschema to display the schema of a collection
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  /**
   * Get a record by id or return all records in the collection
   * @param {string} _id - the id of a record you would like to search for
   * @returns {object} - The results from the search
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
   * Create a new record in the database
   * @param {object} record - the record you would like to add to your collection
   * @returns {Promise<object>} - The new record that was saved
   */
  create(record) {
    console.log('r', record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   * Update finds a record by id and modifies it with the given record information
   * @param {string} _id - ID of the record you are looking to update
   * @param {object} record - Information about the record you would like to update
   * @returns {object} - The updated record
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * Delete finds a record by id and removes it from the collection
   * @param {string} _id - ID of the item you want to delete
   * @returns {object} - The record that was removed from the database
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
