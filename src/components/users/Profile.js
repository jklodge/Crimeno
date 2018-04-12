import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Profile extends React.Component {
  state = {
    user: {}
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
  }

  render() {
    return (
      <section className="user">
        <h1>Username: {this.state.user.username}</h1>
        <h1>Username: {this.state.user.email}</h1>

        <Link className="button"
          to={`/users/${this.props.match.params.id}/edit`}>Edit</Link>
      </section>
    );
  }
}

export default Profile;
