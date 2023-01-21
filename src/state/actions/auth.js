import ApiService from '../../Services/ApiService';
import { initialState } from '../../util/environment';

export async function logIn(store, { email, password }) {
  const { loginUrl, userIdentity } = initialState;
  const { axiosRequest } = ApiService();

  try {
    const response = await axiosRequest(
      'POST',
      loginUrl,
      JSON.stringify({ [userIdentity]: { email, password } }),
    );
    await store.setState({
      jwt: response.data.jwt || '',
      user: response.data[userIdentity] || {},
    });
    return response.request.status;
  } catch (error) {
    const e = error.toString().toLowerCase().split(' status code ');
    return e.length > 1
      ? parseInt(e.slice(-1), 10)
      : 418;
  }
}

export async function logOut(store) {
  await store.setState(initialState);
}
