/* global google */

import React from 'react';
import axios from 'axios';



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
      zoom: 14
    });
    this.infoWindow = new google.maps.InfoWindow;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.geocoder = new google.maps.Geocoder;

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.panel);


    const polys = [
      '51.520561,-0.169133:51.482520,-0.113515:51.523124,-0.079869',
      '51.482520,-0.113515:51.523124,-0.079869:51.474491,-0.045327'
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

    crimes.forEach(crime => {
      this.marker = new google.maps.Marker({
        position: crime.location,
        title: 'CRIME',
        icon: icons[crime.crime]
      });
      const createdAt = crime.createdAt.slice(0, -14);
      console.log(createdAt);
      this.marker.addListener('click', () => {
        this.infoWindow.setContent(`
          <div>
            <img src=${icons[crime.crime]} />
            <p><strong>User added: ${crime.username}</strong></p>
            <p>Date added: ${createdAt}</p>
            <p>Crime taken: ${crime.crime}</p>

            <p>${crime.incidentDescription}</p>
            <p><a href="/crimes/${crime._id}">See more...</a></p>
          </div>
        `);
        this.infoWindow.open(this.map, this.marker);
        console.log('open', this.infoWindow);
        console.log('info', this.props.crimes);
        console.log('crime info', crime);
      });
      this.marker.setMap(this.map);
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

  render() {
    this.getCurrentLocation();

    return (
      <section>
        <button onClick={this.returnToCurrentLocation} type="button" className="button go">Current Location</button>
        {this.state.heatmapReady && <button onClick={this.toggleHeatMap} type="button" className="button go">HeatMap</button>}

        <div id="go">
          <button onClick={this.calculateAndDisplayRoute} type="button" className="button go">Search</button>
        </div>
        <div id="google-map" ref={element => this.mapDiv = element}></div>

        <div id="panel" ref={element => this.panel = element}></div>
        <div id="go">
          <main>
            <div>{this.crimes}</div>
          </main>
        </div>

        <img onClick={this.returnToCurrentLocation} src="/assets/images/place.png" id="current"></img>
      </section>
    );
  }
}

export default GoogleMap;
