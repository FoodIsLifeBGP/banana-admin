import ApiService from './ApiService';

const { axiosRequest } = ApiService();

const GetClient = async (id) => {
  const response = await axiosRequest('GET', `/clients/${id}`);
  return response.data.client;
};

const GetClients = async (pageNumber, pageSize) => {
  const response = await axiosRequest('GET', `/clients?page=${pageNumber}&items=${pageSize}`);
  return response.data;
};

const samplecall2 = async (pageNumber, pageSize) => {
  const response = await axiosRequest.get('/clients', {
    params: {
      page: pageNumber,
      items: pageSize,
    },
  });
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
  GetClient, GetClients, samplecall2, UpdateClientStatus,
};
