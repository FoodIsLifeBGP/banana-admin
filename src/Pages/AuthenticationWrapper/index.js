// import React from 'react';
// import AuthService from './Services/AuthService';
// import { Redirect, Route } from 'react-router-dom';

// const PrivateRoute = ({ component, ...rest }) => {

//   // Add your own authentication on the below line.
//   const isLoggedIn = AuthService.isLoggedIn()

//   return (
//     <Route
//       {...rest}
//       render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> }
//     />
//   )
// };

// export default PrivateRoute;
