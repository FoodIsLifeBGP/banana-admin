const getServerEndPoint = () => {
  if (process.env.REACT_APP_VARIANT === 'development') {
    return 'https://dev.bananaapp.org';
  } if (process.env.REACT_APP_VARIANT === 'production') {
    return 'https://api.bananaapp.org';
  } if (process.env.REACT_APP_VARIANT === 'local') {
    return 'http://localhost:3000';
  }
  // eslint-disable-next-line no-console
  return console.error('Please set your APP_VARIANT in your .env as either "development", "production" or "local".');
};

const initialState = {
  LOGIN_URL: 'admin_auth',
  USER_IDENTITY: 'admin',
  API_BASE_URL: getServerEndPoint(),
  alert: undefined,
  jwt: undefined,
  user: undefined,
};

export default initialState;
