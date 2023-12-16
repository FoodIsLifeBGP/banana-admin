import ApiService from '../../Services/ApiService';
import initialState from '../../util/environment';

export async function logIn(store, { email, password }) {
  const { LOGIN_URL, USER_IDENTITY } = initialState;
  const { axiosRequest } = ApiService();

  console.log(email, password);

  const storeJwtAndUser = (token, user) => {
    if (token && user) {
      localStorage.setItem('jwt', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  try {
    const response = await axiosRequest(
      'POST',
      LOGIN_URL,
      JSON.stringify({ [USER_IDENTITY]: { email, password } }),
    );

    const jwt = response.data.jwt || '';
    const user = response.data[USER_IDENTITY] || {};

    // store.setState({ jwt, user });
    storeJwtAndUser(jwt, user);

    store.setState({ email: '', password: '' });

    // TODO: Update Layout user, jwt state values
    return response.request.status;
  } catch (error) {
    const e = error.toString().toLowerCase().split(' status code ');
    return e.length > 1
      ? parseInt(e.slice(-1), 10)
      : 418;
  }
}

export async function logOut(store) {
  console.log('start');
  console.log(initialState);
  await store.setState(initialState);
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  console.log(localStorage);
  console.log('end');
}
