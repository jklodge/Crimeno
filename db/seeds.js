const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Crime = require('../models/crime');

const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  Crime.create([{
    username: 'annoymous',
    crime: 'Robbery',
    location: 'Number 10, London, NW10',
    date: '08-03-2018',
    incidentDescription: 'A guy came on to me and robbed me'
  }, {
    username: 'annoymous',
    crime: 'Assault',
    location: 'Number 11, London, NW10',
    date: '08-02-2018',
    incidentDescription: 'It was a woman came up to me and attacked me'
  }])
    .then(crimes => console.log(`${crimes.length} crimes created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
