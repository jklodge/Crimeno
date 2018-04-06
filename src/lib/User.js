class User {

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

}
export default User;
