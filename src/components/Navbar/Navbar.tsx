import React from 'react';
import {
  useHistory,
} from "react-router-dom";
import Auth from '../../utils/auth';

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
