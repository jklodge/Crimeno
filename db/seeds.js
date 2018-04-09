const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Crime = require('../models/crime');

const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  Crime.create([{
    username: 'annoymous',
    crime: 'Robbery',
    location: {
      lat: 51.5216,
      lng: -0.0723
    },
    date: '08-03-2018',
    incidentDescription: 'A guy came on to me and robbed me'
  }, {
    username: 'annoymous',
    crime: 'Assault',
    location: {
      lat: 51.514036,
      lng: -0.070421
    },
    date: '08-02-2018',
    incidentDescription: 'It was a woman came up to me and attacked me'
  }])
    .then(crimes => console.log(`${crimes.length} crimes created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
