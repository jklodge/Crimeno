/* global google */

import React from 'react';


class GoogleMap extends React.Component {

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
  }


  componentDidUpdate() {
    const { pos, crimes } = this.props;

    if(pos) {
      this.infoWindow.setPosition(pos);
      this.infoWindow.open(this.map);
      this.infoWindow.setContent('You are here');
      this.map.setCenter(pos);
    }

    const icons = {
      'Gun crime': '/assets/images/gun.png',
      'Motor Vehicle': '/assets/images/car1.png',
      'Robbery': '/assets/images/thief.png',
      'Assault': '/assets/images/fight.png',
      'Knife Crime': '/assets/images/knife.png',
      'Sexual Offence': '/assets/images/face.png',
      'Racist Offence': '/assets/images/face.png',
      'Homophobic Offence': '/assets/images/face.png'
    };

    crimes.forEach(crime => {
      this.marker = new google.maps.Marker({
        position: crime.location,
        title: 'CRIME',
        icon: icons[crime.crime]
      });
      this.marker.addListener('click', () => {
        this.infoWindow.setContent(`
          <div>
            <img src=${icons[crime.crime]} />
            <p><strong>${crime.username}</strong></p>
            <p class="title">${crime.crime}</p>
            <p>${crime.incidentDescription}</p>
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



  render() {
    if(this.props.start.location && this.props.end.location) {
      console.log('loc', this.props.start.location && this.props.end.location);
      this.calculateAndDisplayRoute();
      this.directionsDisplay.setMap(this.map);
    }

    return (
      <section>
        <main className="floating-panel">
          <div id="panel" ref={element => this.panel = element}></div>
        </main>
        <div id="google-map" ref={element => this.mapDiv = element}></div>
        {/* <div id="show" ref={element => this.show = element}>${crime.username} \n  ${crime.incidentDescription}`</div> */}

      </section>
    );
  }
}

export default GoogleMap;
