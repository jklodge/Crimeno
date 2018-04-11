// import React from 'react';
// import axios from 'axios';
//
//
// class Police extends React.Component {
//
//   state = {
//     police: []
//   }
//
//   componentDidMount() {
//     axios.get('https://data.police.uk/api/crimes-street/all-crime?poly=51.631029,0.512656:51.377149,0.292929:51.586681,0.274240')
//       .then(res => {
//         this.setState({ police: res.data });
//       })
//       .then(() => {
//         this.state.police.forEach(crime => console.log(crime));
//       });
//   }
//
//
//   // this.state.police.map(crime => {
//   //       console.log('each crime', crime);
//   //     });
//
//
//   render() {
//     return (
//       <section>
//       </section>
//     );
//   }
// }
//
//
// export default Police;
