/* global google */

import React from 'react';


class GoogleMap extends React.Component {
  // marker = null;
  // map = null;


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
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.panel);

    const control = this.panel;
    control.style.display = 'block';
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    const { pos } = this.props;
    this.infoWindow.setPosition(pos);
    this.infoWindow.open(this.map);
    this.infoWindow.setContent('You are here');
    this.map.setCenter(pos);
  }


  componentWillReceiveProps() {

  }

  calculateAndDisplayRoute() {
    const start = this.props.start.location;
    const end = this.props.end.location;

    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  setMarker() {
    this.props.crimes.forEach(crime => {
      this.marker = new google.maps.Marker({
        position: crime.location,
        title: 'CRIME'
      });
      this.marker.setMap(this.map);
    });
  }

  render() {
    if(this.props.start.location && this.props.end.location) {
      console.log('loc', this.props.start.location && this.props.end.location);
      this.calculateAndDisplayRoute();
      this.directionsDisplay.setMap(this.map);
    }
    if(this.props.crimes.length) this.setMarker();

    return (
      <section>
        <main className="floating-panel">
          <div id="panel" ref={element => this.panel = element}></div>
        </main>
        <div id="google-map" ref={element => this.mapDiv = element}></div>

      </section>
    );
  }
}

export default GoogleMap;
