/* global google */

import React from 'react';


class AutoComplete extends React.Component {

  componentDidMount() {
    this.autoCompleteInput = new google.maps.places.Autocomplete(this.input);
    this.autoCompleteInput.addListener('place_changed', () => {
      const place = this.autoCompleteInput.getPlace();
      this.props.onChange({
        target: { name: 'location', value: place.formatted_address }
      });
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log(lng);
    });
  }

  // componentWillReceiveProps({ center, zoom }) {
  //   this.map.setCenter(center);
  //   this.map.setZoom(zoom);
  //   this.marker.setPosition(center);
  //
  // }

  render() {
    return (
      <input {...this.props} type="text" ref={element => this.input = element} />
    );
  }
}

export default AutoComplete;
