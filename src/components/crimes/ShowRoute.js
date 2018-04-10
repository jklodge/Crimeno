import React from 'react'
import axios from 'axios';


class ShowRoute extends React.Component {
  state = {

  }


  componentDidMount() {
    axios.get(`/api/crimes/${this.props.match.params.id}`)
      .then(res => this.setState({ crimes: res.data }, () => console.log(this.state.crime)));
  }
  toggleDeletePressed = () => {
    this.
  }
}
