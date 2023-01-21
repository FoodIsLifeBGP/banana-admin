import axios from 'axios';
import getEnv from '../util/environment';

const ApiService = () => {
  const { API_BASE_URL } = getEnv();

  const fullPath = (endpoint) => `${API_BASE_URL}/${endpoint}`;

  const axiosRequest = (method, endpoint, body = null) => {
    const JSON_HEADERS = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const userToken = localStorage.getItem('userToken');
    let AUTH_HEADER = {};

    if (userToken) {
      AUTH_HEADER = {
        Authorization: `Bearer ${JSON.parse(userToken).jwt}`,
      };
    }

    return axios({
      baseURL: fullPath(endpoint),
      method,
      headers: { ...JSON_HEADERS, ...AUTH_HEADER },
      data: body,
    });
  };

  const storeJwt = (token) => {
    if (token && token.jwt) {
      localStorage.setItem('userToken', JSON.stringify(token));
      return true;
    }
    return false;
  };

  const clearJwt = () => {
    localStorage.removeItem('userToken');
    return true;
  };

  return {
    axiosRequest,
    storeJwt,
    clearJwt,
  };
};

export default ApiService;
