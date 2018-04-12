import React from 'react';

const heading = {
  fontSize: '30px',
  textAlign: 'center',
  color: '#0D4D7A'

};

const imageStyle = {
  width: '240px',
  textAlign: 'left',
  height: '460px',
  // marginLeft: '40px',
  marginTop: '20px',
  padding: '0'
};

const google = {
  backgroundImage: '/assets/images/googleios.png',
  width: '300px'
};

class Home extends React.Component {

  render() {
    return (
      <section>
        <h1 className="title">CrimeNo</h1>
        <div className="homePage">

          <div className="columns is-multiline">
            <div className="column is-half-desktop">
              <div className="paragraphy-home-page">
                <h1 style={heading}>Stopping crime one report at a time</h1>
                <p>It's hard to talk about crime, but its important to let others know when and where it happened. That way you'll help others avoid those places and alert people if it's reoccuring.</p>
              </div>
              <div className="paragraphy-home-page">
                <h1 style={heading}>Working together to raise awareness</h1>
                <p>Imagine if everytime a crime took place we let people know! Think of the things that person could try to avoid so it doesn't happen to them. It's not only the area it took place in, it's how it happened that can help people prevent it happening again.</p>
              </div>
            </div>
            <div className="column is-half-desktop">
              <img style={imageStyle} src="/assets/images/crimeno.png"/>
            </div>
            <div className="download-icons">
              <p>Coming soon to your app store</p>
              <img style={google} src="/assets/images/googleios.png" />
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default Home;
