import React from 'react';
import axios from 'axios';
// import User from '../../lib/User';
import Auth from '../../lib/Auth';

class EditProfile extends React.Component {
  state = {
    username: '',
    email: ''
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${this.props.match.params.id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() =>
        this.props.history.push(`/users/${this.props.match.params.id}`));
  }

  render() {
    return (
      <section>

        <form className="form" onSubmit={this.handleSubmit}>

          <div className="field">
            <h1 className="subtitle"><strong>Update your account info</strong></h1>
            <label htmlFor="name">UserName</label>
            <input
              className="input"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="name">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <button onSubmit={this.handleSubmit} className="button is-primary">Submit</button>

        </form>

      </section>
    );
  }
}

export default EditProfile;
