import React from 'react';

const heading = {
  color: 'white',
  fontSize: '40px',
  textAlign: 'center',
  height: '50vh'
};

const imageStyle = {
  filter: 'grayscale(100%)',
  backgroundImage: 'url(/assets/images/london.jpg)',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: '0'
};


class Home extends React.Component {



  render() {
    return (
      <section style={imageStyle}>

        <h1 style={heading}>Stopping crime one report at a time</h1>
      </section>
    );
  }
}

export default Home;
