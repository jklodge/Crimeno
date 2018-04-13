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

  style = {
    height: '50%'
    // marginTop: '70vh'
  };

  button = {
    marginLeft: '70px',
    marginRight: '10px'
  };

  content = {
    color: 'white',

    padding: '10px'
  }


  render() {
    return (
      <div className="container">
        <a style={this.button} onClick={this.toggleModal} className="title">CRIMENO</a>
        <a onClick={this.toggleModal}><i className="fas circle fa-binoculars"></i></a>
        {this.state.modalIsOpen &&
          <div style={this.style} className="modal is-active">
            <div className="modal-background"></div>
            <div style={this.content} className="modal-content">
              <p style={this.content}>Thanks for joining Crimeno and contributing to the community!</p>
              <p style={this.content}>All your reports are annoymous, it&apos;s up to you if you use your username or choose annoymous on you reports.</p>
              <p style={this.content}>The heatmap has been created using the Police API data, and signifies the level of crime in that area</p>
            </div>
            <button className="modal-close is-large" onClick={this.toggleModal} aria-label="close"></button>
          </div>
        }

        <form>
          <main style={this.style} className="search">
            <div onClick={this.openSearch} id="start" className="field">
              <label htmlFor="name">Start</label>
              <AutoComplete className="input" placeholder="Location" name="startAddress" onChange={this.handleChange} value={this.state.startAddress} />
            </div>
            <div id="end" className="field">
              <label htmlFor="name">Finish</label>
              <AutoComplete className="input" placeholder="Location" name="endAddress" onChange={this.handleChange} value={this.state.endAddress} />
            </div>
          </main>
        </form>


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
