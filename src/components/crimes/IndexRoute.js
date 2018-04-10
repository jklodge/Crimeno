import React from 'react';
// import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import AutoComplete from '../common/AutoComplete';
import Location from '../../lib/Location';
// import Promise from 'bluebird';

import GoogleMap from '../../components/common/GoogleMap';

class IndexRoute extends React.Component {
  state = {
    crimes: [],
    query: '',
    start: {},
    end: {},
    pos: null,
    currentLocation: '',
    police: []
  }

  componentDidMount() {
    axios.get('/api/crimes/')
      .then(res => {
        this.setState({ crimes: res.data });
        return Location.getLocation();
      })
      .then(pos => this.setState({ pos }));
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

  // handlePos = (pos) => {
  //   this.setState({ pos });
  // }

  render() {
    return (
      <div className="container">
        <h1 className="title">All incidents</h1>
        {/* <button onClick="getPoliceData">Get Police</button> */}

        {/* <button onClick={this.reportCrime}>
          <FontAwesome
            name='plus'
            size='5x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />;
        </button>
        <FontAwesome
          name='search'
          size='5x'
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />; */}


        <form>
          <main>

            <div id="start" className="field">
              <label htmlFor="name">Current Location</label>
            </div>
          </main>
          <div id="start" className="field">
            <label htmlFor="name">Location</label>
            <AutoComplete className="input" placeholder="Location" name="start" onChange={this.handleChange} />
          </div>
          <div id="end" className="field">
            <label htmlFor="name">Location</label>
            <AutoComplete className="input" placeholder="Location" name="end" onChange={this.handleChange} />
          </div>


        </form>
        <GoogleMap
          crimes={this.state.crimes}
          start={this.state.start}
          end={this.state.end}
          pos={this.state.pos}
        />



      </div>
    );
  }
}
export default IndexRoute;
