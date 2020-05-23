class Auth {
  isAuthenticated = false;

  authenticate(onAuthenticatedCallback = () => { }) {
    this.isAuthenticated = true;
    setTimeout(onAuthenticatedCallback, 100); // fake async
  }

  signout(onSignoutCallback = () => { }) {
    this.isAuthenticated = false;
    setTimeout(onSignoutCallback, 100);
  }
}

export default new Auth();
