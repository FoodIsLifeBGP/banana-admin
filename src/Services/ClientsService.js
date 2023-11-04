import ApiService from './ApiService';

const GetClients = async (pageNumber, pageSize) => {
  const { axiosRequest } = ApiService();
  const response = await axiosRequest(
    'GET',
    `/clients?page=${pageNumber}&items=${pageSize}`,
  );
  return response.data;
};

const samplecall2 = async (pageNumber, pageSize) => {
  const { axiosRequest } = ApiService();
  const response = await axiosRequest.get('/clients', {
    params: {
      page: pageNumber,
      items: pageSize,
    },
  });
  return response.data;
};

export { GetClients, samplecall2 };
