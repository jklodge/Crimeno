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
      crime: 'Knife Crime',
      address: 'Empress Drive, Chiselhurst',

      location: {
        lat: 51.4185935,
        lng: -0.0623498
      },
      date: '2018-09-01',
      incidentDescription: 'Dami Odeyingbo, 18, stabbed in Bromley'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Cazenove Rd, Cazenove, London, N16 6PA',

      location: {
        lat: 51.5656234,
        lng: -0.0667966
      },
      date: '2018-01-28',
      incidentDescription: 'Yaya Mbye, 26, collapsed in a children’s play area in Stoke Newington, north east London, after being set upon by three men and repeatedly stabbed.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Atwell Rd, London, SE15 4TW',

      location: {
        lat: 51.4682888,
        lng: -0.0692221
      },
      date: '2018-01-29',
      incidentDescription: 'Juan Olmos Saca, 39, stabbed in Peckham'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'HMP Wormwood Scrubs, Shepherd\'s Bush, London W12 0AE',

      location: {
        lat: 51.5169637,
        lng: -0.2425358
      },
      date: '2018-01-31',
      incidentDescription: 'Khader Saleh, 25, stabbed at Wormwood Scrubs prison'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Abbey Road, Barking',

      location: {
        lat: 51.530898,
        lng: 0.077449
      },
      date: '2018-02-03',
      incidentDescription: 'Hassan Ozcan, 19, knifed in Barking'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'St Mary\'s Cl, London, N17 9UD',

      location: {
        lat: 51.5975449,
        lng: -0.0686779
      },
      date: '2018-02-03',
      incidentDescription: 'Kwabena Nelson, a youth worker, died after being stabbed near his home in Tottenham'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Fellows Rd, London, NW3 3JS',

      location: {
        lat: 51.5441694,
        lng: -0.1681349
      },
      date: '2018-02-08',
      incidentDescription: 'Hannah Leonard, 55, stabbed in a flat in Camden'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Hopton Rd, London, SW16 2EL',

      location: {
        lat: 51.4258591,
        lng: -0.128915
      },
      date: '2018-02-11',
      incidentDescription: 'Sabri Chibani, 19, stabbed in Streatham'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Staines Rd, Ilford, IG1 2UY',
      location: {
        lat: 51.5512647,
        lng: 0.0851212
      },
      date: '2018-02-13',
      incidentDescription: 'Saeeda Hussain, 54, was found with fatal head injuries at an address in Staines Road, Ilford, and pronounced dead at the scene'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Goldwing Cl, London, E16 3EQ',
      location: {
        lat: 51.51275,
        lng: 0.0195402
      },
      date: '2018-02-14',
      incidentDescription: 'Lord Promise Nkenda, 17, was stabbed to death in Goldwing Close, Canning Town. Five people have so far been arrested over his murder.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: '14-11 Logan Pl, Kensington, London W8 6QN',
      location: {
        lat: 51.495115,
        lng: -0.196550
      },
      date: '2018-02-18',
      incidentDescription: 'Lewis Blackman, 19, knifed in Kensington'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Haliday Square, Southall, UB2 4UG',
      location: {
        lat: 51.508416,
        lng: -0.350430
      },
      date: '2018-02-19',
      incidentDescription: 'Rotimi Oshibanjo, 26, stabbed in Southall'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Bartholomew Rd, London, NW5 2AH',
      location: {
        lat: 51.547817,
        lng: -0.135170
      },
      date: '2018-02-20',
      incidentDescription: 'Sadiq Mohammed, 20, stabbed in Camden'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Bartholomew Rd, London, NW5 2AH',
      location: {
        lat: 51.547817,
        lng: -0.135170
      },
      date: '2018-01-04',
      incidentDescription: 'Abdikarim Hassan, 17, stabbed in Camden'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Melrose Gardens, Hammersmith, London, W6 7RN',
      location: {
        lat: 51.500032,
        lng: -0.222631
      },
      date: '2018-03-01',
      incidentDescription: 'Christopher Beaumont, 42, stabbed in Hammersmith'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Albert Rd, London, SE25 4JE',
      location: {
        lat: 51.395829,
        lng: -0.063985
      },
      date: '2018-03-05',
      incidentDescription: 'Kelva Smith, 20, knifed in Croydon'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Assault',
      address: 'Alpha Road, New Cross, London',
      location: {
        lat: 51.475466,
        lng: -0.030580
      },
      date: '2018-03-05',
      incidentDescription: 'Julian Joseph, 36, was attacked on a bus on Alpha Road, New Cross, and died after succumbing to a serious head injury 11 days later on on March 24.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Gun Crime',
      address: 'Chalgrove Road, Tottenham, London',
      location: {
        lat: 51.600581,
        lng: -0.057945
      },
      date: '2018-04-02',
      incidentDescription: 'Tanesha Melbourne, 17, was gunned down in Chalgrove Road, Tottenham, on the evening of April 2.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Gun Crime',
      address: 'Hollywood green, 180 High Rd, Wood Green, London N22 6EJ',
      location: {
        lat: 51.597242,
        lng: -0.109200
      },
      date: '2018-03-05',
      incidentDescription: 'Kelvin Odunuyi, 19, became the first teenager to die from gunshot wounds after he was killed outside the Vue Cinema complex in Wood Green. It is believed his assailants fled the scene by moped.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Knife Crime',
      address: 'Towpath Walk, London, E9 5HX',
      location: {
        lat: 51.550010,
        lng: -0.028960
      },
      date: '2018-03-18',
      incidentDescription: 'Tyrone Silcott, 41, was stabbed on Towpath Walk in Hackney. A 28-year-old man was later charged with Mr Silcott’s murder.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Assault',
      address: 'Stern Cl, Barking, IG11 0XW',
      location: {
        lat: 51.528008,
        lng: 0.118524
      },
      date: '2018-03-26',
      incidentDescription: 'An unidentified man, 59, was taken to hospital with blood gushing from his nose and later died from his injuries following a suspected assault in Stern Close, Barking.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Assault',
      address: 'Camden Road, north London',
      location: {
        lat: 51.547953,
        lng: -0.130331
      },
      date: '2018-03-31',
      incidentDescription: 'An 80-year-old woman died after being reportedly pushed over in Camden Road, north London. She was admitted to hospital and later discharged, before being admitted to a second hospital, where she died on April 3. A 29-year-old man has since appeared in court over her death.'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Gun Crime',
      address: 'Markhouse Rd, Walthamstow, London',
      location: {
        lat: 51.574847,
        lng: -0.029349
      },
      date: '2018-04-02',
      incidentDescription: 'Amaan Shakoor, 16, became the youngest murder victim of the year so far when he was shot in an attack in Markhouse Road, Walthamstow, on the same evening as teenager Tanesha Melbourne'
    }, {
      username: 'annoymous',
      user: user,
      crime: 'Assault',
      address: 'Upper Clapton Rd, London, E5 9BU',
      location: {
        lat: 51.563390,
        lng: -0.058561
      },
      date: '2018-04-04',
      incidentDescription: 'An unidentified man, 53, collapsed following a suspected altercation in Clapton, north-east London. Police attended to the man at a bookmakers in Upper Clapton Road, and he was treated by paramedics, but pronounced dead at the scene. No arrests have been made over his death.'

    }]))
    .then(crimes => console.log(`${crimes.length} crimes created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
//Source: http://metro.co.uk/2018/04/06/six-teenagers-stabbed-four-separate-incidents-london-violence-continues-7445285/
