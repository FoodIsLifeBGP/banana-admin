const getServerEndPoint = () => {
  if (process.env.REACT_APP_VARIANT === 'development') {
    return 'https://dev.bananaapp.org';
  } if (process.env.REACT_APP_VARIANT === 'production') {
    return ' http://20.150.197.108:3000';
  } if (process.env.REACT_APP_VARIANT === 'local') {
    return 'http://localhost:3000';
  }
  // eslint-disable-next-line no-console
  return console.error('Please set your REACT_APP_VARIANT in your .env as either "development", "production" or "local".');
};

const initialState = {
  LOGIN_URL: 'admin_auth',
  USER_IDENTITY: 'admin',
  API_BASE_URL: getServerEndPoint(),
  alert: undefined,
  jwt: JSON.parse(localStorage.getItem('Banana JWT')) || undefined,
  user: JSON.parse(localStorage.getItem('Banana User')) || undefined /* TODO: pull `user` from localStorage here, otherwise set undefined */,
};

export default initialState;
