import React from 'react';
// import AuthService from './Services/AuthService';
// import { Redirect, Route } from 'react-router-dom';

import { Outlet, Navigate } from 'react-router-dom';
import useGlobal from '../../state';

// TODO:
// 1. set user and JWT to localStorage
// 2. on each page load check if user and JWT present,
//    if not, redirect to <LoginPage/> i.e. a default/fall-through for auth failure

// const PrivateRoute = ({ component, ...rest }) => {

//   TODO: this is just a non-working copy/pasta, needs to be implemented
//   const isLoggedIn = AuthService.isLoggedIn()

//   return (
//     <Route
//       {...rest}
//       render={(props) => isLoggedIn ?
//         <Component {...props} />
//           :
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }}
//         />}
//     />
//   )
// };

// export default PrivateRoute;

function PrivateRoute() {
  const [{ jwt, user }] = useGlobal();
  if (!user || !jwt) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
