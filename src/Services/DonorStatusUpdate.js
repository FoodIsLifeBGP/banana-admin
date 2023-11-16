import ApiService from './ApiService';

const UpdateDonorStatus = async (donorId, status) => {
  const { axiosRequest } = ApiService();
  const response = await axiosRequest(
    'PATCH',
    `/donors/${donorId}/update_status`,
    { status },
  );
  return response.data;
};

export default UpdateDonorStatus;
