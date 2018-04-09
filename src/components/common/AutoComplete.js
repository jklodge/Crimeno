/* global google */

import React from 'react';


class AutoComplete extends React.Component {

  componentDidMount() {
    this.autoCompleteInput = new google.maps.places.Autocomplete(this.input);
    this.autoCompleteInput.addListener('place_changed', () => {
      const place = this.autoCompleteInput.getPlace();
      this.props.onChange({
        target: {
          name: this.input.name,
          value: {
            location: place.geometry.location.toJSON(),
            address: place.formatted_address
          }
        }
      });
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
