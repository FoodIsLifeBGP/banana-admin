import ApiService from './ApiService';

const { axiosRequest } = ApiService();

const GetAdmins = async (pageNumber, pageSize, sortBy, orderBy) => {
  const response = await axiosRequest(
    'GET',
    `/admins?page=${pageNumber}&count=${pageSize}&sort_by=${sortBy}&order_by=${orderBy}`,
  );
  return response.data;
};

const GetAdmin = async (id) => {
  const response = await axiosRequest('GET', `/admins/${id}`);
  return response.data;
};

const CreateAdmin = async (firstName, lastName, email, password) => {
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

const UpdateAdmin = async (id, firstName, lastName, email, password) => {
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

const UpdateAdminStatus = async (id, status) => {
  const response = await axiosRequest('PATCH', `clients/${id}/update_status`, {
    id,
    status,
  });
  return response.data;
};

export {
  GetAdmins, GetAdmin, CreateAdmin, UpdateAdmin, UpdateAdminStatus,
};
