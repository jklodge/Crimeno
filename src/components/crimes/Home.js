import React from 'react';

const heading = {
  color: 'Gray',
  fontSize: '30px',
  textAlign: 'center'
};

const imageStyle = {
  width: '200px',
  height: '400px',
  // marginLeft: '40px',
  marginTop: '20px',
  padding: '0'
};


class Home extends React.Component {



  render() {
    return (
      <section className="homePage">
        <div className="column is-one-half-desktop">
            <h1 style={heading}>Stopping crime one report at a time</h1>
            <p>It's hard to talk about crime, but its important to let others know when and where it happened to help us avoid those places and alert people if its reoccuring.</p>
          </div>
        <img style={imageStyle} src="/assets/images/crimeno.png"/>


      <div className="top">
          <h1 style={heading}>Working together to raise awareness</h1>
          <p>Imagine if everytime a crime took place we let people know. Think of the things that person could try to avoid so it doesn't happen to them. It's not only the location it took place, it's how it took place that can stop it happening again.</p>
        </div>
    </section>
    );
  }
}

export default Home;
