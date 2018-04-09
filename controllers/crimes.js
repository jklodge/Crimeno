const Crime = require('../models/crime');

function indexRoute(req, res, next) {
  return Crime.find()
    .then(crimes => res.json(crimes))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.location = req.body.location.location;
  return Crime.create(req.body)
    .then(crime => res.status(201).json(crime))
    .catch(next);
}

function showRoute(req, res, next) {
  return Crime.findById(req.params.id)
    .then(crime => res.json(crime))
    .catch(next);
}

function updateRoute(req, res, next) {
  return Crime.findById(req.params.id)
    .then(crime => Object.assign(crime, req.body))
    .then(crime => crime.save())
    .then(crime => res.json(crime))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return Crime.findById(req.params.id)
    .then(crime => crime.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
