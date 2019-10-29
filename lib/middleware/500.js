'use strict';

/**
 * Error handler for express
 * @param err - The error object 
 * @param {object} res - Response data sent back to the client
 * @throws - Will throw an error whenever a specified path does not exist
 */
module.exports = (err, req, res, next) => {
  console.log('error', err);
  let error = { error: err };
  res
    .status(500)
    .json(error)
    .end();
};
