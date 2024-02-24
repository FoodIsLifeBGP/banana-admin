import axios from 'axios';
import initialState from '../util/environment';

const ApiService = () => {
  const { API_BASE_URL } = initialState;

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  const getAuthHeader = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      return {
        Authorization: `Bearer ${jwt}`,
      };
    }
    return {};
  };

  const getHeaders = (isFormData = false) => {
    const headers = {
      Accept: 'application/json',
      ...getAuthHeader(),
    };

    /* omitting `Content-Type` for formData-- the browser automatically sets it */
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  };

  const axiosRequest = (method, endpoint, body = null) => axiosInstance({
    url: endpoint,
    method,
    headers: getHeaders(),
    data: body ? JSON.stringify(body) : null,
  });

  const axiosFormRequest = (method, endpoint, body = null) => axiosInstance({
    url: endpoint,
    method,
    headers: getHeaders({ 'Content-Type': 'multipart/form-data' }),
    data: body,
  });

  return {
    axiosRequest,
    axiosFormRequest,
  };
};

export default ApiService;
