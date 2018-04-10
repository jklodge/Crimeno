import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';


import Form from './Form';

class NewRoute extends React.Component {

  state = {
    username: '',
    crime: '',
    location: '',
    date: '',
    incidentDescription: '',
    submitReport: false
  }

  componentDidMount() {
    axios.get(`/api/crimes/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));//with state we're updating the state at the top
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  toggleSubmitReport = () =>{
    this.setState({ submitReport: !this.state.submitReport });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/crimes/${this.props.match.params.id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() =>
        this.props.history.push(`/crimes/${this.props.match.params.id}`));
  }

  render() {
    return (
      <div className="container">
        <Form
          toggleSubmitReport={this.toggleSubmitReport}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </div>
    );
  }
}

export default NewRoute;