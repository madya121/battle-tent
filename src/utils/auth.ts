export const fakeAuth = {
  isAuthenticated: false,
  authenticate(onAuthenticatedCallback: () => void) {
    fakeAuth.isAuthenticated = true;
    setTimeout(onAuthenticatedCallback, 100); // fake async
  },
  signout(onSignoutCallback: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(onSignoutCallback, 100);
  }
};
