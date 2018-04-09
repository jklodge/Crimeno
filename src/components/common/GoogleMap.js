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



    // this.marker = new google.maps.Marker(this.mapDiv, {
    //   position: this.props.center,
    //   map: this.map,
    //   title: 'Hello'
    // });
    // console.log('errr', this.mapDiv, google);
  }

  componentWillReceiveProps() {
    // if (this.props.crimes.length === 0) return false;
    // console.log('Hello');
    // console.log('crimes', this.props.crimes);
    // this.marker = new google.maps.Marker({
    //   position: this.props.crimes[0].location,
    //   // map: this.map,
    //   title: 'CRIME'
    // });
    // console.log(this.marker);
    // this.marker.setMap(this.map);
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
    if(this.props.crimes.length) this.setMarker();
    return (
      <div className="google-map" ref={element => this.mapDiv = element}></div>
    );
  }
}

export default GoogleMap;
