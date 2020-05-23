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
import Auth from './utils/auth';

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
  return Auth.isAuthenticated ? (
    <p>
      Welcome username
      <button
        onClick={() => {
          Auth.signout(() => history.push('/'));
        }}
      >
        Change name
      </button>
    </p>
  ) : <p>Guest</p>;
}

/** A wrapper for <Route> that redirects to the login screen
 * if you're not yet authenticated.
 * @param children any protected screen
 */
function PrivateRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) => Auth.isAuthenticated
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
