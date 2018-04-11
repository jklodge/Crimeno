const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Crime = require('../models/crime');
const User = require('../models/user');

const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create({
    username: 'annoymous',
    email: 'hello@crimeno.com',
    password: 'password',
    passwordConfirmation: 'password'
  })
    .then(user => Crime.create([{
      username: 'annoymous',
      user: user,
      crime: 'Robbery',
      address: 'London',

      location: {
        lat: 51.5216,
        lng: -0.0723
      },
      date: '2018-08-03',
      incidentDescription: 'A guy came on to me and robbed me'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Assault',
      address: 'London',

      location: {
        lat: 51.514036,
        lng: -0.070421
      },
      date: '2018-03-02',
      incidentDescription: 'It was a woman came up to me and attacked me'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Gun Crime',
      address: 'London',
      location: {
        lat: 51.5220012,
        lng: -0.0738715
      },
      date: '2018-01-04',
      incidentDescription: 'Crazy time'
    }]))
    .then(crimes => console.log(`${crimes.length} crimes created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
