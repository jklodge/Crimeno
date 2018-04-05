import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class Register extends React.Component {

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => this.props.history.push('/crimes'));
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input className="input"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            className="input"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            onChange={this.handleChange}
          />
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Register;
