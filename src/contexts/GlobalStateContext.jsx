/* eslint-disable max-len */
import React, {
  useState, createContext, useMemo, useContext,
} from 'react';
import ApiService from '../Services/ApiService';
import initialState from '../util/environment';

export const GlobalStateContext = createContext({
  jwt: localStorage.getItem('jwt') || '',
  admin: localStorage.getItem('user') || {},
  // eslint-disable-next-line no-unused-vars
  logIn: async ({ email, password }) => {},
  logOut: async () => {},
});

export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalStateContext must be used within <GlobalStateProvider/> !');
  }

  return context;
};

export function GlobalStateProvider({ children }) {
  const [jwt, setJwt] = useState(initialState.jwt);
  const [admin, setAdmin] = useState(initialState.user);

  const { axiosRequest } = ApiService();

  /* TODO: get `expiresIn` from backend once 'jwt expiry flow' is implemented and store it */
  // e.g. data.jwt_expiry
  const storeJwtAndUser = (token, user) => {
    if (token && user) {
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', JSON.stringify(user));
      setJwt(token);
      setAdmin(user);
      return true;
    }
    return false;
  };

  const logIn = async ({ email, password }) => {
    const { LOGIN_URL, USER_IDENTITY } = initialState;

    try {
      const { data, request } = await axiosRequest(
        'POST',
        LOGIN_URL,
        { [USER_IDENTITY]: { email, password } },
      );

      const user = data[USER_IDENTITY] || {};

      storeJwtAndUser(data.jwt, user);
      return request.status;
    } catch (error) {
      const e = error.toString().toLowerCase().split(' status code ');
      return e.length > 1 ? parseInt(e.slice(-1), 10) : 418;
    }
  };

  const logOut = async () => {
    setJwt('');
    setAdmin({});
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  // /* TODO: tweak and/or implement these methods */
  // const requestResetToken = async ({
  //   onComplete, input, setIsSubmitting, setError,
  // }) => {
  //   const { userIdentity } = initialState;
  //   const endpoint = `/password_resets/${userIdentity}`;
  //   const email = { email: input };

  //   try {
  //     await axiosRequest('POST', endpoint, email);
  //     setIsSubmitting(false);
  //     onComplete();
  //   } catch (e) {
  //     setIsSubmitting(false);
  //     setError(e.response ? e.response.data.message : "We're sorry, but there was an error. Please try again.");
  //   }
  // };

  // const submitNewPassword = async ({
  //   input, token, setIsSubmitting, onComplete, setError,
  // }) => {
  //   const { userIdentity } = initialState; // Adjust based on your initialState structure
  //   const password = { password: input };
  //   const endpoint = `/password_resets/${userIdentity}/${token}`;

  //   try {
  //     await axiosRequest('PATCH', endpoint, password);
  //     setIsSubmitting(false);
  //     onComplete();
  //   } catch (e) {
  //     setIsSubmitting(false);
  //     setError(e.response ? e.response.data.message : "We're sorry, but there was an error. Please try again.");
  //   }
  // };

  // const registerAdmin = async (newAdmin) => {
  //   const { createUrl, USER_IDENTITY } = initialState;
  //   let response;

  //   try {
  //     response = await axiosRequest('POST', createUrl, {
  //       [USER_IDENTITY]: newAdmin,
  //     });
  //     storeJwtAndUser(response.data.jwt, response.data.admin);
  //     return response.status;
  //   } catch (error) {
  //     logOut();
  //   }

  //   return response.status;
  // };

  const contextProps = useMemo(() => ({
    jwt, admin, logIn, logOut,
  }), [jwt, admin]);

  return (
    <GlobalStateContext.Provider value={contextProps}>
      {children}
    </GlobalStateContext.Provider>
  );
}
