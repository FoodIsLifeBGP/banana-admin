import ApiService from './ApiService';

const { axiosRequest } = ApiService();

const GetClient = async (id) => {
  const response = await axiosRequest('GET', `/clients/${id}`);
  return response.data.client;
};

const GetClients = async (pageNumber, pageSize, sortBy, orderBy) => {
  const response = await axiosRequest('GET', `/clients?page=${pageNumber}&count=${pageSize}&sort_by=${sortBy}&order_by=${orderBy}`);
  return response.data;
};

const UpdateClientStatus = async (id, status) => {
  const response = await axiosRequest('PATCH', `clients/${id}/update_status`, {
    id,
    status,
  });
  return response.data;
};

export {
  GetClient, GetClients, UpdateClientStatus,
};
