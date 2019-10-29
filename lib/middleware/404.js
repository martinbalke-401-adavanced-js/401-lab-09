'use strict';

/**
 * 404 status page middleware
 * @param {object} res - The response sent back to the client
 * @throws - Throws an error indicating the requested resource is not found
 */
module.exports = (req, res, next) => {
  let error = { error: 'Resource Not Found' };
  res
    .status(404)
    .json(error)
    .end();
};
