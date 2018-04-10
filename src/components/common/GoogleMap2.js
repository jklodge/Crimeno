// /* global google */
//
// import React from 'react';
//
//
// class GoogleMap extends React.Component {
//   // marker = null;
//   // map = null;
//
//
//   componentDidMount() {
//     this.map = new google.maps.Map(this.mapDiv, {
//       center: {
//         lat: 51.51,
//         lng: -0.08
//       },
//       zoom: 14
//     });
//     this.infoWindow = new google.maps.InfoWindow();
//     this.directionsService = new google.maps.DirectionsService;
//     this.directionsDisplay = new google.maps.DirectionsRenderer;
//     this.directionsDisplay.setMap(this.map);
//     this.directionsDisplay.setPanel(this.panel);
//     console.log('what info', this.infoWindow);
//     const control = this.panel;
//     control.style.display = 'block';
//     this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
//
//
//     this.props.crimes.forEach(crime => {
//       this.marker = new google.maps.Marker({
//         position: crime.location,
//         title: 'CRIME'
//       });
//       this.marker.addListener('click', () => {
//         this.infoWindow.setContent(crime.username && crime.incidentDescription);
//         this.infoWindow.open(this.map, this.marker);
//         console.log('open', this.infoWindow);
//         console.log('info', this.props.crimes);
//         console.log('crime info', crime);
//
//
//       });
//       this.marker.setMap(this.map);
//     });
//
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(pos => {
//         pos = {
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude
//         };
//         this.infoWindow.setPosition(pos);
//         this.infoWindow.setContent('You are here');
//         this.infoWindow.open(this.map);
//         this.map.setCenter(pos);
//       }, () => {
//         this.handleLocationError(true, this.infoWindow, this.map.getCenter());
//       });
//     } else {
//       // Browser doesn't support Geolocation
//       this.handleLocationError(false, this.infoWindow, this.map.getCenter());
//     }
//   }
//
//   handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
//     this.infoWindow.setPosition(pos);
//     this.infoWindow.setContent(browserHasGeolocation ?
//       'Error: The Geolocation service failed.' :
//       'Error: Your browser doesn\'t support geolocation.');
//     this.infoWindow.open(this.map);
//   }
//
//   //
//   // componentWillReceiveProps(crime, () => {
//   //   infoWindow.setContent(console.log(crime))
//   //
//   //
//   // })
//   //
//   // }
//
//   calculateAndDisplayRoute() {
//     const start = this.props.start.location;
//     const end = this.props.end.location;
//
//     this.directionsService.route({
//       origin: start,
//       destination: end,
//       travelMode: 'WALKING'
//     }, (response, status) => {
//       if (status === 'OK') {
//         this.directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   }
//
//
//
//   render() {
//     // if(this.props.crimes.length) this.setMarker();
//     if(this.props.start.location && this.props.end.location) {
//       console.log('loc', this.props.start.location && this.props.end.location);
//       this.calculateAndDisplayRoute();
//       this.directionsDisplay.setMap(this.map);
//     }
//     return (
//       <section>
//         <main className="floating-panel">
//           <div id="panel" ref={element => this.panel = element}></div>
//         </main>
//         <div id="google-map" ref={element => this.mapDiv = element}></div>
//         <div id="show" ref={element => this.show = element}></div>
//
//       </section>
//     );
//   }
// }
//
// export default GoogleMap;
// componentDidMount() {
//   axios.get('/api/crimes/')
//     .then(res => {
//       this.setState({ crimes: res.data });
//       return Location.getLocation();
//     })
//     .then(pos => this.setState({ pos }));
// }
// 
// componentDidMount() {
//   Promise.props({
//     crimes: axios.get('/api/crimes/').then(res => res.data),
//     pos: Location.getLocation()
//   })
//     .then(data => this.setState({
//       crimes: data.crimes,
//       pos: data.pos
//     }, () => console.log(this.state)));//with state we're updating the location state
// }
