import ApiService from './ApiService';

const { axiosRequest } = ApiService();

const GetDonor = async (id) => {
  const response = await axiosRequest('GET', `/donors/${id}`);
  return response.data.donor;
};

const GetDonors = async (pageNumber, pageSize) => {
  const response = await axiosRequest('GET', `/donors?page=${pageNumber}&items=${pageSize}`);
  return response.data;
};

const samplecall2 = async (pageNumber, pageSize) => {
  const response = await axiosRequest.get('/donors', {
    params: {
      page: pageNumber,
      items: pageSize,
    },
  });
  return response.data;
};

const UpdateDonorStatus = async (id, status) => {
  const response = await axiosRequest('PATCH', `donors/${id}/update_status`, {
    id,
    status,
  });
  return response.data;
};

export {
  GetDonor, GetDonors, samplecall2, UpdateDonorStatus,
};
