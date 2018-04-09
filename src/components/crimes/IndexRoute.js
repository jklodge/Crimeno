import React from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import AutoComplete from '../common/AutoComplete';


import GoogleMap from '../../components/common/GoogleMap';

class IndexRoute extends React.Component {
  state = {
    crimes: [],
    query: ''
  }

  componentDidMount() {
    axios.get('/api/crimes/')
      .then(res => this.setState({ crimes: res.data }));//with state we're updating the location state
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

  render() {
    return (
      <div className="container">
        <h1 className="title">All incidents</h1>

        <button onClick={this.reportCrime}>
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
        />;


        <form>
          <div className="field">
            <label htmlFor="name">Location</label>
            <AutoComplete className="input" placeholder="Location" name="location" location={this.state.location} onChange={this.handleSearch} />
          </div>

          {/* <div className="field">
            <input className="input"
              type="text"
              name="search"
              placeholder="Search Route"
              // location=
              onChange={this.handleSearch} />
          </div> */}
        </form>
        <GoogleMap crimes={this.state.crimes} />



      </div>
    );
  }
}
export default IndexRoute;
