import React from 'react';
import { Navigate } from 'react-router-dom';

export default function WrapperRoute({
  component: Component,
  isPrivate,
  path,
  location,
  ...rest
}) {
  let signed = false;
  const token = localStorage.getItem('authToken');
  token ? (signed = true) : (signed = false);

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && signed) {
    return <Navigate to='/chat' />;
  }

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */

  if (isPrivate && !signed) {
    return <Navigate to='/login' />;
  }

  if (path === '/') {
    return <Navigate to='/chat' />;
  }

  return <Component {...rest} />;
}

WrapperRoute.defaultProps = {
  isPrivate: false,
};
