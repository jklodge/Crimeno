import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from '../../lib/User';

import Auth from '../../lib/Auth';


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

  render() {
    if(!this.state.crime) return null;
    console.log(this.state.id, this.state.crime.user);
    return (
      <section>
        <h1>Username of reported crime: {this.state.crime.username}</h1>
        <h1>Incident Description: {this.state.crime.incidentDescription}</h1>
        <h1>Address: {this.state.crime.address}</h1>

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
