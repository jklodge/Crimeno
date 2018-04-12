import React from 'react';
// import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import AutoComplete from '../common/AutoComplete';
import Location from '../../lib/Location';
import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

import GoogleMap from '../../components/common/GoogleMap';

class IndexRoute extends React.Component {
  state = {
    crimes: [],
    query: '',
    startAddress: '',
    start: {},
    endAddress: '',
    end: {},
    pos: null,
    currentLocation: '',
    hideMap: false,
    modalIsOpen: false
  }

  componentDidMount() {
    axios.get('/api/crimes/')
      .then(res => {
        this.setState({ crimes: res.data });
        return Location.getLocation();
      })
      .then(pos => this.setState({ pos }, () => console.log(this.state)));
  }

  // componentDidUpdate() {
  //   axios.get('https://data.police.uk/docs/method/neighbourhood/')
  //     .then(res => this.setState({ police: res.data }, () => console.log(this.state)));
  // }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value }, () => console.log(this.state.query));
  }

  reportCrime = () => {
    this.props.history.push('/crimes/report');
  }


  handleLocationClick = ({ location, address }) => {
    console.log('handleLocationClick', location, address);
    this.setState({ start: location, startAddress: address }, () => console.log(this.state));
  }

  handleSupport = (e) => {
    e.preventDefault();
    axios.post(`/api/crimes/${this.props.match.params.id}/support`,this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ crime: res.data }))
      .catch(err => console.error(err));
  }

  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen});
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.toggleModal}>Search</button>
        {this.state.modalIsOpen &&
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <p className="title">Search a route for safety</p>
            <form>

              <main className="search">
                <div onClick={this.openSearch} id="start" className="field">
                  <label htmlFor="name">Start</label>
                  <AutoComplete className="input" placeholder="Location" name="startAddress" onChange={this.handleChange} value={this.state.startAddress} />
                </div>
                {/* <button id="getLocation">Get Current Location</button> */}
                <div id="end" className="field">
                  <label htmlFor="name">Finish</label>
                  <AutoComplete className="input" placeholder="Location" name="endAddress" onChange={this.handleChange} value={this.state.endAddress} />
                </div>
              </main>
            </form>
          </div>
          <button className="modal-close is-large" onClick={this.toggleModal} aria-label="close"></button>
        </div>
        }
        <h1 className="title">CrimeNo</h1>

        <GoogleMap
          crimes={this.state.crimes}
          start={this.state.start}
          end={this.state.end}
          pos={this.state.pos}
          handleLocationClick={this.handleLocationClick}
          handleSupport={this.handleSupport}
        />

      </div>
    );
  }
}
export default IndexRoute;
