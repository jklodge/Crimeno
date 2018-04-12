const Crime = require('../models/crime');
const User = require('../models/user');

function indexRoute(req, res, next) {
  return Crime.find()
    .then(crimes => res.json(crimes))
    .then(() => console.log('you', req.currentUser))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
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

function supportRoute(req, res, next) {
  req.body.user = req.currentUser;
  return Crime.findById(req.params.id)
    .then(crime => {
      crime.supports.push(req.body.user);
      return crime.save();
    })
    .then(crime => res.status(201).json(crime))
    .catch(next);
}

function deleteSupportRoute(req, res, next){
  return User.findById(req.currentUser._id)
    .then(user => {
      user.supports = user.supports.filter(support => !support.equals(req.params.id));
      return user.save();
    })
    .then(crime => res.status(201).json(crime))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  support: supportRoute,
  deleteSupport: deleteSupportRoute
};
