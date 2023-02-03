import globalHook from 'use-global-hook';
import getEnv from '../util/environment';
import { logIn } from './actions/auth';

// import * as actions from './actions';

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

const useGlobal = globalHook(initialState, { logIn });

export default useGlobal;
