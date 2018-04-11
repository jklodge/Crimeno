import React from 'react';
// import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import AutoComplete from '../common/AutoComplete';
import Location from '../../lib/Location';
// import Promise from 'bluebird';
// import { Link } from 'react-router-dom';

import GoogleMap from '../../components/common/GoogleMap';
// import Police from '../../components/common/Police';

class IndexRoute extends React.Component {
  state = {
    crimes: [],
    query: '',
    start: {},
    end: {},
    pos: null,
    currentLocation: '',
    // police: [],
    hideMap: false
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


  handleLocationClick = (address) => {
    this.setState({ start: address }, () => console.log(this.state));
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">All incidents</h1>

        <form>
          <div id="start" className="field">
            <label htmlFor="name">Current Location</label>
          </div>
          <main className="search">
            <div onClick={this.openSearch} id="start" className="field">
              <label htmlFor="name">Start</label>
              <AutoComplete className="input" placeholder="Location" name="start" onChange={this.handleChange} />
            </div>
            {/* <button id="getLocation">Get Current Location</button> */}
            <div id="end" className="field">
              <label htmlFor="name">Finish</label>
              <AutoComplete className="input" placeholder="Location" name="end" onChange={this.handleChange} />
            </div>
          </main>
        </form>
        <GoogleMap
          crimes={this.state.crimes}
          start={this.state.start}
          end={this.state.end}
          pos={this.state.pos}
          handleLocationClick={this.handleLocationClick}
        />

      </div>
    );
  }
}
export default IndexRoute;
