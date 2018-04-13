import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from '../../lib/User';

import Auth from '../../lib/Auth';
import Moment from 'react-moment';

// exports default class MyComponent extends React.Component {
//     render() {
//         return (
//             <Moment parse="YYYY-MM-DD HH:mm">
//                 1976-04-19 12:59
//             </Moment>
//         );
//     }
// }

class ShowRoute extends React.Component {
  state = {
    id: User.getUser()._id,
    crime: null,
    deletePressed: false
  }

  componentDidMount() {
    axios.get(`/api/crimes/${this.props.match.params.id}`)
      .then(res => this.setState({ crime: res.data }));
  }
  toggleDeletePressed = () => {
    this.setState({ deletePressed: !this.state.deletePressed });
  }
  handleDelete = () => {
    axios({
      method: 'DELETE',
      url: `/api/crimes/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() =>
        this.props.history.push('/crimes'));
  }

  handleSupport = (e) => {
    e.preventDefault();
    axios.post(`/api/crimes/${this.props.match.params.id}/support`,this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ crime: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    if(!this.state.crime) return null;
    console.log(this.state.id, this.state.crime.user);
    return (
      <section className="showPage">
        {this.state.crime.supports.includes(this.state.id) ? (
          <button disabled className="button is-info fave"><i className="far fa-hand-rock"></i>{this.state.crime.supports.length}</button>
        ) : (

          <button onClick={this.handleSupport} className="button is-info fave"><i className="far fa-hand-rock"></i>{this.state.crime.supports.length}</button>
        )}
        <h1>Username of reported crime: {this.state.crime.username}</h1>
        <h1>Address: {this.state.crime.address}</h1>
        <h1>Incident: {this.state.crime.crime}</h1>
        <h1>Incident Description: {this.state.crime.incidentDescription}</h1>
        <Moment parse="DD-MM-YYYY HH:mm">
          2018-04-18 20:06
        </Moment>
        
        <p></p>
        <span>Added: </span><Moment fromNow>2018-04-12T12:59-0500</Moment>
        {this.state.deletePressed ? (
          <div>
            <p>Are you sure?</p>
            <button className="button" onClick={this.handleDelete}>Yes</button>
            <button className="button"
              onClick={this.toggleDeletePressed}>No</button>

          </div>
        ) : (
          this.state.id === this.state.crime.user &&
          <div>
            <Link className="button"
              to={`/crimes/${this.props.match.params.id}/edit`}>Edit</Link>
            <button className="button"
              onClick={this.toggleDeletePressed}>Delete</button>
          </div>
        )}
      </section>
    );
  }
}

export default ShowRoute;
