import React from 'react';
import getEnv from '../util/environment';
import useGlobalHook from 'use-global-hook';
import { InitialState } from './index.types';

import * as actions from './actions';

const {
	CREATE_URL, API_BASE_URL, LOGIN_URL, USER_IDENTITY,
} = getEnv();

export const initialState: InitialState = {
	userIdentity: USER_IDENTITY,
	apiBaseUrl: API_BASE_URL as string,
	loginUrl: LOGIN_URL,
	createUrl: CREATE_URL,
	alert: undefined,
	jwt: undefined,
	user: undefined,
};

// Paste the following into your code to use global state & actions:

// import useGlobal from '@state';
// const [ state, actions ] = useGlobal;

// eslint-disable-next-line react-hooks/rules-of-hooks
const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
