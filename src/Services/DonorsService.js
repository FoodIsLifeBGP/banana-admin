import ApiService from './ApiService';

const GetDonors = async (pageNumber, pageSize) => {
  const { axiosRequest } = ApiService();
  const response = await axiosRequest(
    'GET',
    `/donors?page=${pageNumber}&items=${pageSize}`,
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

export { GetDonors, samplecall2 };
