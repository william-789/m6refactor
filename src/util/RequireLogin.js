import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// encapsulate all pages besides login
function RequireLogin({ children }) {
  const { isLogged } = useContext(UserContext);

  if (!isLogged()) {
    return <Redirect to="/login" />;
  }

  return children;
}

export default RequireLogin;
