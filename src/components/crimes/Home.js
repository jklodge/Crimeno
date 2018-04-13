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
        <h1 className="title">CRIMENO</h1>
        <div className="homePage">

          <div className="columns is-multiline">
            <div className="column is-half-desktop">
              <div className="paragraphy-home-page">
                <h1 style={heading}>Stopping crime one report at a time</h1>
                <p>It&apos;s hard to talk about crime, but its important to let others know when and where it is happening. That way you&apos;ll help others avoid those places and alert them if it&apos;s reoccuring.</p>
              </div>
              <div className="paragraphy-home-page">
                <h1 style={heading}>Working together to raise awareness</h1>
                <p>Imagine if everytime a crime took place we let people know! Think of the things they could try to avoid so it doesn&apos;t happen to them. It&apos;s not only the area it took place in, it&apos;s how it happened that can help prevent it happening again.</p>
              </div>
              <div className="paragraphy-home-page">
                <h1 style={heading} className="title">Thank You</h1>
                <p>Thanks for joining Crimeno and contributing to the community!</p>
                <p>All your reports are annoymous, it's up to you if you use your username or choose annoymous on you reports.</p>
                <p>The heatmap has been created using the Police API data, and signifies the level of crime in that area</p>
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
