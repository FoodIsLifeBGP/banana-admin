import ApiService from './ApiService';

const UpdateClientStatus = async (clientId, status) => {
  const { axiosRequest } = ApiService();
  const response = await axiosRequest(
    'PATCH',
    `/clients/${clientId}/update_status`,
    { status },
  );
  return response.data;
};

export default UpdateClientStatus;
