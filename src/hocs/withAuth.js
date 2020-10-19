import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Redirect } from 'react-router-dom';

export default function withAuth(Component, tokenRequired) {
  const displayName = `withAuth(${Component.disiplayName || Component.name})`;

  const C = (props) => {
    const token = localStorage.getItem('token');

    // localStorage에 토큰이 없으면 Signin으로
    if (!token && tokenRequired) return <Redirect to="/signin" />;

    // localStorage에 토큰이 있으면 Home으로
    if (token && !tokenRequired) return <Redirect to="/" />;

    return <Component {...props} token={token} />;
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  return hoistStatics(C, Component);
}
