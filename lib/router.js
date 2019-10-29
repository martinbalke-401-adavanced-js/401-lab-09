'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);
const router = express.Router();

// TODO: Comment
router.param('model', modelFinder.load);

// TODO: Swagger Comment
router.get('/', (req, res, next) => {
  res.send('Homepage');
});

// TODO: Swagger Comment
router.get('/models', (req, res, next) => {
  modelFinder.list().then(models => res.status(200).json(models));
});

// TODO: Swagger Comment
router.get('/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

// TODO: Swagger Comment
router.get('/:model', handleGetAll);

// TODO: Swagger Comment
router.post('/:model', handlePost);

// TODO: Swagger Comment
router.get('/:model/:id', handleGetOne);

// TODO: Swagger Comment
router.put('/:model/:id', handlePut);

// TODO: Swagger Comment
router.delete('/:model/:id', handleDelete);

// TODO: JSDoc Comment
function handleGetAll(req, res, next) {
  req.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data
      };
      res.status(200).json(output);
    })
    .catch(next);
}

// TODO: JSDoc Comment
function handleGetOne(req, res, next) {
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

// TODO: JSDoc Comment
function handlePost(req, res, next) {
  req.model
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

// TODO: JSDoc Comment
function handlePut(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

// TODO: JSDoc Comment
function handleDelete(req, res, next) {
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
