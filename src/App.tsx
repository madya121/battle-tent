import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
  RouteProps,
} from "react-router-dom";
import Login from './screens/Login';
import Lobby from './screens/Lobby';
import { fakeAuth } from './utils/auth';



// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthButton />
        <Switch>
          <Route path="/about">
            <h3>About</h3>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/lobby">
            <Lobby />
          </PrivateRoute>
          <Redirect to="/lobby" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function AuthButton() {
  const history = useHistory();
  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome username
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push('/'));
        }}
      >
        Change name
      </button>
    </p>
  ) : null;
}

/** A wrapper for <Route> that redirects to the login screen
 * if you're not yet authenticated.
 * @param children any protected screen
 */
function PrivateRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) => fakeAuth.isAuthenticated
        ? children
        : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
