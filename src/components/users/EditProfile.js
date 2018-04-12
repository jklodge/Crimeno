import React from 'react';
import axios from 'axios';
import User from '../../lib/User';
import Auth from '../../lib/Auth';

class EditProfile extends React.Component {
  state = {
    username: User.getUser().username,
    user: null
  }

  componentDidMount() {
    axios.get(`/api/crimes/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .then(() => console.log('he', this.state.address));//with state we're updating the state at the top
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
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="name">UserName</label>
            <input
              className="input"
              placeholder="Username"
              name="username"
              value={this.state.username}
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
