import initialState from 'src/util/environment';
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

const createAdmin = async (firstName, lastName, email, password) => {
  const response = await axiosRequest('POST', '/admins/create', {
    admin: {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    },
  });
  return response.data;
};

const updateAdmin = async (id, firstName, lastName, email, password) => {
  const response = await axiosRequest('PATCH', `/admins/${id}/update`, {
    admin: {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
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

export {
  getAdminIndex,
  getAdmin,
  createAdmin,
  updateAdmin,
  updateAdminStatus,
  initiatePasswordReset,
};
