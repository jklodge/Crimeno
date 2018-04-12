const mongoose = require('mongoose');

// const supportSchema = new mongoose.Schema({
//   user: {type: mongoose.Schema.ObjectId, ref: 'User'}
//
// });

const crimeSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  // supports: [ supportSchema ],
  supports: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  username: { type: String },
  crime: { type: String, enum: ['Robbery', 'Motor Vehicle', 'Assault', 'Sexual Offence', 'Gun Crime', 'Racist Crime', 'Homophobic Crime'] },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  date: { type: String },
  incidentDescription: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Crime', crimeSchema);
