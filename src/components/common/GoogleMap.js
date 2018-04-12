/* global google */

import React from 'react';
import axios from 'axios';



class GoogleMap extends React.Component {

  state = {
    // hideMap: false,
    police: []
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


    // =51.668095,0.487937:51.310265,0.387533:51.608899,0.263407')


    axios.get('https://data.police.uk/api/crimes-street/all-crime?poly=51.491748,0.487932:51.701605,0.232500:51.609592,0.264631&date=2018-01')
      .then(res => {
        this.setState({ police: res.data });
      })
      .then(() => {
        // this.state.police.forEach(crime => {
        //   const newPos = {
        //     lat: parseFloat(crime.location.latitude),
        //     lng: parseFloat(crime.location.longitude)
        //   };
        //   this.marker = new google.maps.Marker({
        //     position: newPos,
        //     title: 'CRIME'
        //   });
        //   this.marker.addListener('click', () => {
        //     this.infoWindow.setContent(`
        //     <div>
        //       <p>Police Reports</p>
        //       <p><strong>${crime.category}</strong></p>
        //     </div>
        //   `);
        //     this.infoWindow.open(this.map, this.marker);
        //     console.log('open', this.infoWindow);
        //     console.log('info', this.props.crimes);
        //     console.log('crime info', crime);
        //
        //     // new google.maps.LatLng(37.782, -122.447),
        //     // const heatMapData = [
        //     //
        //     // ]
        //     // const center = new google.maps.LatLng(newArray);
        //
        //   });
        //   this.marker.setMap(this.map);
        // });

        const heatMapData = this.state.police.map(crime => {
          return new google.maps.LatLng(crime.location.latitude, crime.location.longitude);
        });
        const heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatMapData
        });
        heatmap.setMap(this.map);
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

    // this.setState({ hideMap: !this.state.hideMap }, () => console.log(this.state));
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

  // toggleMap = () => {
  //   this.setState({ hideMap: !this.state.hideMap }, () =>     console.log(this.state));
  // }

  render() {
    this.getCurrentLocation();

    return (
      <section>
        <button onClick={this.returnToCurrentLocation} type="button" className="button go">Current Location</button>

        <div id="go">
          <button onClick={this.calculateAndDisplayRoute} type="button" className="button go">Search</button>
        </div>
        <div id="google-map" ref={element => this.mapDiv = element}></div>

        <div id="panel" ref={element => this.panel = element}></div>
        <div id="go">
          <main>
            <div>{this.crimes}</div>
            {/* <button onClick={this.calculateAndDisplayRoute} type="button" className="button go">Show Map</button> */}
          </main>
        </div>

        <img onClick={this.returnToCurrentLocation} src="/assets/images/place.png" id="current"></img>
      </section>
    );
  }
}

export default GoogleMap;
