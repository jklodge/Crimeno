import React from 'react';
import FontAwesome from 'react-fontawesome';


class IndexRoute extends React.Component {
  state = {
    crimes: []
  }

  render() {
    return (
      <div className="container">
        <button>
          <FontAwesome
            name='plus'
            size='2x'
            // spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />;
        </button>



      </div>
    );
  }
}
export default IndexRoute;
