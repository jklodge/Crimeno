const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
  username: { type: String },
  crime: { type: String, enum: ['Robbery', 'Motor Vehicle', 'Assault', 'Sexual Offence', 'Gun Crime', 'Racist Crime', 'Homophobic Crime'] },
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
