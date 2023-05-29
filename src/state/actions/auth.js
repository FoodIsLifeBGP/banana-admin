import ApiService from '../../Services/ApiService';
import initialState from '../../util/environment';

export async function logIn(store, { email, password }) {
  const { LOGIN_URL, USER_IDENTITY } = initialState;
  const { axiosRequest } = ApiService();

  try {
    const response = await axiosRequest(
      'POST',
      LOGIN_URL,
      JSON.stringify({ [USER_IDENTITY]: { email, password } }),
    );
    await store.setState({
      jwt: response.data.jwt || '',
      user: response.data[USER_IDENTITY] || {},
    });

    store.setState({ email: '', password: '' });
    localStorage.setItem('Banana JWT', response.data.jwt || '');
    localStorage.setItem('Banana User', JSON.stringify(response.data[USER_IDENTITY]) || '{}');
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
