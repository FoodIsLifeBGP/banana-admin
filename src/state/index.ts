import React from 'react';
import getEnv from 'util/environment';
import { InitialState } from './index.types';

import * as actions from './actions';

const {
  USER_IDENTITY,
  API_BASE_URL,
  LOGIN_URL,
} = getEnv();