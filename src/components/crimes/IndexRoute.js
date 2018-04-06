import React from 'react';
import FontAwesome from 'react-fontawesome';


class IndexRoute extends React.Component {
  state = {
    crimes: []
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  reportCrime = () => {
    this.props.history.push('/crimes/report');
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.reportCrime}>

          <FontAwesome
            name='plus'
            size='5x'
            pulse
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />;
          <FontAwesome
            name='search'
            size='5x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />;
        </button>

        <form>
          <div className="field">
            <input className="input"
              type="text"
              name="search"
              placeholder="Search"
              onChange={this.handleChange} />
          </div>
        </form>



      </div>
    );
  }
}
export default IndexRoute;
