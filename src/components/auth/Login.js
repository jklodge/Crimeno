import React from 'react';
import axios from 'axios';
import User from '../../lib/User';
import Flash from '../../lib/Flash';
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
      .then(res => {
        Auth.setToken(res.data.token);
        User.setUser(res.data.user);
      })
      .then(() => Flash.setMessage('success', 'Welcome!'))
      .then(() => this.props.history.push('/crimes'));
  }

  render() {
    return (
      <section className="login">
        <h1 className="login-title">Login to Crimeno</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input className="input login-input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              className="input login-input"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </div>
          <button className="button is-primary">Submit</button>
        </form>
      </section>
    );
  }
}
export default Login;
