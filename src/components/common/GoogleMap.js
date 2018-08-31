/* global google */

import React from 'react';
import axios from 'axios';
import IndexRoute from '../../components/crimes/IndexRoute';



class GoogleMap extends React.Component {

  state = {
    hideHeatMap: false,
    police: [],
    heatmapReady: false
  }

  getHeatMapData = (poly, date) => {
    return axios.get('https://data.police.uk/api/crimes-street/all-crime', {
      params: { poly, date }
    });
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapDiv, {
      center: {
        lat: 51.51,
        lng: -0.08
      },
      zoom: 14,
      styles:
        [
          {

            'featureType': 'administrative',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'saturation': -100
              },
              {
                'lightness': 20
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'saturation': -100
              },
              {
                'lightness': 40
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'saturation': -10
              },
              {
                'lightness': 30
              }
            ]
          },
          {
            'featureType': 'landscape.man_made',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'saturation': -60
              },
              {
                'lightness': 10
              }
            ]
          },
          {
            'featureType': 'landscape.natural',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'saturation': -60
              },
              {
                'lightness': 60
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              },
              {
                'saturation': -100
              },
              {
                'lightness': 60
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              },
              {
                'saturation': -100
              },
              {
                'lightness': 60
              }
            ]
          }
        ]
    });
    this.infoWindow = new google.maps.InfoWindow;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.geocoder = new google.maps.Geocoder;

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.panel);


    const polys = [
      '51.504098, -0.075407:51.513140, -0.111134:51.520350, -0.092852',
      '51.487720, 0.062136:51.473608, -0.059400:51.523835, -0.117422',
      '51.536863, 0.090632:51.487720, 0.062136:51.473608, -0.059400',
      '51.544550, -0.033307:51.536863, 0.090632:51.487720, 0.062136',
      '51.567604, -0.094419:51.544550, -0.033307:51.536863, 0.090632',
      '51.482520,-0.113515:51.567604, -0.094419:51.544550, -0.033307',
      '51.520561,-0.169133:51.482520,-0.113515:51.567604, -0.094419',
      '51.560775, -0.177160:51.520561,-0.169133:51.482520,-0.113515',
      '51.520561,-0.169133:51.482520,-0.113515:51.523124,-0.079869',
      '51.482520,-0.113515:51.523124,-0.079869:51.474491,-0.045327',
      '51.523124,-0.079869:51.474491,-0.045327:51.505888, -0.016828',
      '51.474491,-0.045327:51.505888, -0.016828:51.486082, -0.207520',
      '51.505888, -0.016828:51.486082, -0.207520:51.538483, -0.251894'
    ];
    const date = '2018-01';
    const requests = polys.map(poly => this.getHeatMapData(poly, date).then(res => res.data));
    Promise.all(requests)
      .then(dataArray => {
        const data = dataArray.reduce((allData, currentData) => {
          return allData.concat(currentData);
        }, []);

        const heatMapData = data.map(crime => {
          return new google.maps.LatLng(crime.location.latitude, crime.location.longitude);
        });

        this.heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatMapData
        });
        this.heatmap.setMap(null);
        this.setState({ heatmapReady: true });
      });

  }



  getCurrentLocation = () => {
    console.log('getting current pos...');
    const { pos, crimes } = this.props;
    if(pos) {
      this.infoWindow.setPosition(pos);
      this.infoWindow.open(this.map);
      this.infoWindow.setContent('You are here');
      this.map.setCenter(pos);
    }

    const icons = {
      'Gun Crime': '/assets/images/gun.png',
      'Motor Vehicle': '/assets/images/car1.png',
      'Robbery': '/assets/images/thief.png',
      'Assault': '/assets/images/fight.png',
      'Knife Crime': '/assets/images/knife.png',
      'Sexual Offence': '/assets/images/warning1.png',
      'Racist Crime': '/assets/images/warning1.png',
      'Homophobic Crime': '/assets/images/warning1.png'
    };

    this.markers = crimes.map(crime => {
      const marker = new google.maps.Marker({
        position: crime.location,
        title: 'CRIME',
        icon: icons[crime.crime]
      });
      const createdAt = crime.createdAt.slice(0, -14);
      console.log(createdAt);
      marker.addListener('click', () => {
        this.infoWindow.setPosition(marker.getPosition());
        this.infoWindow.setContent(`
          <div>
            <img src=${icons[crime.crime]} />
            <p><strong>User added: ${crime.username}</strong></p>
            <p>Date added: ${createdAt}</p>
            <p>Crime taken: ${crime.crime}</p>

            <p>${crime.incidentDescription}</p>
            <p><a href='/crimes/${crime._id}'>See more...</a></p>
          </div>
        `);
        this.infoWindow.open(this.map, this.marker);
        console.log('open', this.infoWindow);
        console.log('info', this.props.crimes);
        console.log('crime info', crime);
      });
      marker.setMap(this.map);
      return marker;
    });
  }

  calculateAndDisplayRoute = () => {
    const { start, end } = this.props;
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log('responses',response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  returnToCurrentLocation = () => {
    if(this.props.pos) {

      this.infoWindow.setPosition(this.props.pos);
      this.infoWindow.open(this.map);
      this.infoWindow.setContent('You are here');
      this.map.setCenter(this.props.pos);

      this.geocoder.geocode({location: this.props.pos}, (results) => {
        console.log('geocodin\'', results[0].formatted_address);
        this.props.handleLocationClick({
          location: this.props.pos,
          address: results[0].formatted_address
        });
      });
    }
  }

  toggleHeatMap = () => {
    if(this.heatmap.map === null) return this.heatmap.setMap(this.map);
    else if (this.heatmap.map === this.map) return this.heatmap.setMap(null);

  }

  style = {
    absolute: 'realitve'
  };

  render() {
    this.getCurrentLocation();

    return (
      <section>
        <button onClick={this.returnToCurrentLocation} type='button' className='button locate go'>Current Location</button>
        {this.state.heatmapReady && <button onClick={this.toggleHeatMap} type='button' className='button is-danger go'>HeatMap</button>}

        <div className='directions'>
          <button onClick={this.calculateAndDisplayRoute} type='button' className='button'>Search</button>
        </div>
        <div style={this.style} id='google-map' ref={element => this.mapDiv = element}></div>

        <div id='panel' ref={element => this.panel = element}></div>
        <div id='go'>
          <main>
            <div>{this.crimes}</div>
          </main>
        </div>

        <img onClick={this.returnToCurrentLocation} src='/assets/images/place.png' id='current'></img>

      </section>
    );
  }
}

export default GoogleMap;
