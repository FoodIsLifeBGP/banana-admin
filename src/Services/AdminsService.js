import initialState from '../util/environment';
import ApiService from './ApiService';

const { axiosRequest } = ApiService();

const getAdminIndex = async (pageNumber, pageSize, sortBy, orderBy) => {
  const response = await axiosRequest(
    'GET',
    `/admins?page=${pageNumber}&count=${pageSize}&sort_by=${sortBy}&order_by=${orderBy}`,
  );
  return response.data;
};

const getAdmin = async (id) => {
  const response = await axiosRequest('GET', `/admins/${id}`);
  return response.data;
};

const createAdmin = async (formData) => {
  const response = await axiosRequest('POST', '/admins/create', {
    admin: {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      account_type: formData.account_type,
    },
  });
  return response.data;
};

const updateAdmin = async (id, formData) => {
  const response = await axiosRequest('PATCH', `/admins/${id}/update`, {
    admin: {
      id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      user_type: formData.user_type,
    },
  });
  return response.data;
};

const updateAdminStatus = async (id, status) => {
  const response = await axiosRequest('PATCH', `clients/${id}/update_status`, {
    id,
    status,
  });
  return response.data;
};

const initiatePasswordReset = async (email) => {
  const response = await axiosRequest('POST', '/password/reset', {
    [initialState.USER_IDENTITY]: {
      email,
    },
  });
  return response.data;
};

const passwordReset = async (token, password) => {
  const response = await axiosRequest('PATCH', '/password/reset', {
    [initialState.USER_IDENTITY]: {
      token,
      password,
    },
  });
  return response.data;
};

export {
  getAdminIndex,
  getAdmin,
  createAdmin,
  updateAdmin,
  updateAdminStatus,
  initiatePasswordReset,
  passwordReset,
};
