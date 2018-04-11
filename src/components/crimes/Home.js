import React from 'react';

const heading = {
  color: 'Gray',
  fontSize: '30px',
  textAlign: 'center'
};

// const imageStyle = {
//   filter: 'grayscale(100%)',
//   backgroundImage: 'url(/assets/images/london.jpg)',
//   height: '100vh',
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: 'cover',
//   padding: '0'
// };


class Home extends React.Component {



  render() {
    return (
      <section className="homePage">
        <header>
          <h1 style={heading}>Stopping crime one report at a time</h1>
          <p>Its hard to talk about crime, but its important to let others know when and where it happened to help us avoid those places and alert people if its reoccuring.</p>
        </header>
      </section>
    );
  }
}

export default Home;
