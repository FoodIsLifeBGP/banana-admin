import React from 'react';
import useGlobalHook from 'use-global-hook';
import getEnv from '../util/environment';

import * as actions from './actions';

const {
  CREATE_URL, API_BASE_URL, LOGIN_URL, USER_IDENTITY,
} = getEnv();

export const initialState = {
  userIdentity: USER_IDENTITY,
  apiBaseUrl: API_BASE_URL,
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  alert: undefined,
  jwt: undefined,
  user: undefined,
};

// Paste the following into your code to use global state & actions:

// import useGlobal from '@state';
// const [ state, actions ] = useGlobal;

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
