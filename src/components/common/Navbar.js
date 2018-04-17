import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';
import User from '../../lib/User';

class Navbar extends React.Component {

  state = {
    navIsOpen: false,
    username: User.getUser().username.charAt(0).toUpperCase() + User.getUser().username.slice(1)

  }
  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/crimes');//props is the property we pass into
  }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="/assets/images/binoculars.png"/>
          </Link>
          <div
            className={`navbar-burger
              ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item"
              to="/crimes">Crimeno</Link>
            <Link className="navbar-item"
              to="/crimes/report">Report</Link>
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Logout</a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() &&  <Link className="navbar-item" to="/register">Register</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.getPayload().sub}`}>Hi, {this.state.username}</Link>}

          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);//whats with router
