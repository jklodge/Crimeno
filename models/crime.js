const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
  username: { type: String },
  crime: { type: String, enum: ['Robbery', 'Motor Vehicle', 'Assault', 'Sexual Offence', 'Gun crime', 'Racist Crime', 'Homophobic Crime'] },
  location: { type: String },
  date: { type: String },
  incidentDescription: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Crime', crimeSchema);
