'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);
const router = express.Router();

// Router paramater middleware for replacing the model parameter 
// enables us to dynamically load multiple models with similiar routes
router.param('model', modelFinder.load);

/**
 * Homepage route for the site
 * @route GET /
 * @returns {string} 200 - A welcome message to show you're on the Homepage
 */
router.get('/', (req, res, next) => {
  res.send('Homepage');
});

/**
 * Route for listing out the available models
 * @route GET /models
 * @group Models - Operations performed on the database
 * @returns {object} 200 - A JSON object of the models in our database
 */
router.get('/models', (req, res, next) => {
  modelFinder.list().then(models => res.status(200).json(models));
});

/**
 * Dynamic route for getting the schema of all models in our database
 * @route GET /:model/schema
 * @group Models - Operations performed on the database
 * @param {string} - :model - the specific model you would like to access
 * @returns {object} 200 - JSON object containing specific information about a models schema
 * @returns {Error} 500 - Generic error for incorrect param
 */
router.get('/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

/**
 * Dynamic route for getting the records of a collection/model in our database
 * @route GET /:model
 * @group Models - Operations performed on the database
 * @param {string} - :model - the specific model you would like to access
 * @returns {object} 200 - JSON object containing all of the records for a given collection
 * @returns {Error} 500 - Generic error for incorrect param
 */
router.get('/:model', handleGetAll);

/**
 * Dynamic route for creating a record in the database
 * @route POST /:model
 * @group Models - Operations performed on the database
 * @param {string} - :model - the specific model you would like to access
 * @returns {object} 200 - JSON object containing the created item as it appears in the database
 * @returns {Error} 500 - Generic error for incorrect param
 */
router.post('/:model', handlePost);

/**
 * Dynamic route for getting one record by it's ID
 * @route GET /:model/:id
 * @group Models - Operations performed on the database
 * @param {string} - :model - the specific model you would like to access
 * @param {string} - :id - the id of the record you are trying to find
 * @returns {object} 200 - JSON object containing the found record
 * @returns {Error} 500 - Generic error for incorrect param
 */
router.get('/:model/:id', handleGetOne);

/**
 * Dynamic route for finding and updating a record
 * @route PUT /:model/:id
 * @group Models - Operations performed on the database
 * @param {string} - :model - the specific model you would like to access
 * @param {string} - :id - the id of the record you are trying to update
 * @returns {object} 200 - JSON object containing the updated information as it appears in the database
 * @returns {Error} 500 - Generic error for incorrect param
 */
router.put('/:model/:id', handlePut);

/**
 * Dynamic route for finding a record by it's ID and deleting it from the database
 * @route DELETE /:model/:id
 * @group Models - Operations performed on the database
 * @param {string} - :model - the specific model you would like to access
 * @param {string} - :id - the id of the record you are trying to delete
 * @returns {object} 200 - JSON object containing the record that was removed from the database
 * @returns {Error} 500 - Generic error for incorrect param
 */
router.delete('/:model/:id', handleDelete);

/**
 * Function handGetAll
 * Handler for routes that are getting all of a collections records
 * @group CRUD - route handlers
 * @param {object} req - Object containing the all of the request data sent from the client
 * @param {object} res - Object containing the response status code as well as JSON data for the count of records and the actual records
 * @param {function} next - Calls the next function which throws an error if the catch block is hit
 */
function handleGetAll(req, res, next) {
  req.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

/**
 * Function handleGetOne
 * Handler for routes that are getting a record by it's specified ID, calls the models .get function
 * @group CRUD - route handlers
 * @param {object} req - Object containing the all of the request data sent from the client
 * @param {object} res - Object containing the response status code as well as JSON data for the count of records and the actual records
 * @param {function} next - Calls the next function which throws an error if the catch block is hit
 */
function handleGetOne(req, res, next) {
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

/**
 * Function handlePost
 * @group CRUD - route handlers
 * @param {object} req - Object containing the all of the request data sent from the client
 * @param {object} res - Object containing the response status code as well as JSON data for the created record
 * @param {function} next - Calls the next function which throws an error if the catch block is hit
 */
function handlePost(req, res, next) {
  req.model
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * Function handlePut
 * Handler for routes that are updating a record in the database, calls the models .update function
 * @group CRUD - route handlers
 * @param {object} req - Object containing the all of the request data sent from the client
 * @param {object} res - Object containing the response status code as well as JSON data for the updated item
 * @param {function} next - Calls the next function which throws an error if the catch block is hit
 */
function handlePut(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * Function handleDelete
 * Handler for routes that are deleting a record inside of the database, calls the models .delete function
 * @group CRUD - route handlers
 * @param {object} req - Object containing the all of the request data sent from the client
 * @param {object} res - Object containing the response status code as well as JSON data for the deleted record
 * @param {function} next - Calls the next function which throws an error if the catch block is hit
 */
function handleDelete(req, res, next) {
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
