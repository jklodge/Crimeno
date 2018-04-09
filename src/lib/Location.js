class Location {
  static getLocation() {
    return new Promise((resolve) => {

      const location = JSON.parse(localStorage.getItem('location'));
      if(location && Date.now() - 1000 * 60 < location.timestamp) {
        console.log('from localStorage', location);
        return resolve(location);
      }


      navigator.geolocation.getCurrentPosition(pos => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: pos.timestamp
        };

        localStorage.setItem('location', JSON.stringify(location));
        console.log('from browser', location);
        resolve(location);
      });
    });
  }
}

export default Location;
