/* global google */

import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {
    new google.maps.Map(this.mapDiv, {
      center: this.props.center,
      zoom: this.props.zoom
    });
    console.log(this.mapDiv, google);
  }

  // componentWillReceiveProps({ center, zoom}) {
  //   this.map.setCenter(center);
  //   this.map.setZoom(zoom);
  // }
  render() {
    return (
      <div className="google-map" ref={element => this.mapDiv = element}></div>
    );
  }
}

export default GoogleMap;
