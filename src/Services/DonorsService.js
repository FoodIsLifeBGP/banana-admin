import ApiService from './ApiService';

const { axiosRequest } = ApiService();

const GetDonor = async (id) => {
  const response = await axiosRequest('GET', `/donors/${id}`);
  return response.data.donor;
};

const GetDonors = async (pageNumber, pageSize, sortBy, orderBy) => {
  const response = await axiosRequest('GET', `/donors?page=${pageNumber}&count=${pageSize}&sort_by=${sortBy}&order_by=${orderBy}`);
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
  GetDonor, GetDonors, UpdateDonorStatus,
};
