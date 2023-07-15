import axios from 'axios';
import initialState from '../util/environment';

const ApiService = () => {
  const { API_BASE_URL } = initialState;
  const fullPath = (endpoint) => `${API_BASE_URL}/${endpoint}`;

  const axiosRequest = (method, endpoint, body = null) => {
    const JSON_HEADERS = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let jwt = localStorage.getItem('jwt');
    let AUTH_HEADER = {};

    if (jwt) {
      jwt = JSON.parse(jwt);
      AUTH_HEADER = {
        Authorization: `Bearer ${jwt}`,
      };
    }

    return axios({
      baseURL: fullPath(endpoint),
      method,
      headers: { ...JSON_HEADERS, ...AUTH_HEADER },
      data: body,
    });
  };

  return {
    axiosRequest,
  };
};

export default ApiService;
