/* global google */

import React from 'react';


class AutoComplete extends React.Component {

  componentDidMount() {
    this.autoCompleteInput = new google.maps.places.Autocomplete(this.input);

    this.autoCompleteInput.addListener('place_changed', () => {
      const place = this.autoCompleteInput.getPlace();

      this.props.onChange({//on change in form
        target: {
          name: this.input.name.replace('Address', ''),//name = location//when I remove address we are left with location
          value: place.geometry.location.toJSON() //changing location type
        }
      });

      this.props.onChange({// on change in form
        target: {
          name: this.input.name,//if name is name
          value: place.formatted_address
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
