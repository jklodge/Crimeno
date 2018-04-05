import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class Login extends React.Component {

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => this.props.history.push('/bangers'));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            placeholder="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />
        </div>
        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}
export default Login;
