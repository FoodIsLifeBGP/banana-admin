const getServerEndPoint = () => {
  if (process.env.REACT_APP_VARIANT === 'development') {
    return 'https://api.thebegoodproject.org';
  } if (process.env.REACT_APP_VARIANT === 'production') {
    return 'https://api.thebegoodproject.org';
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
  jwt: JSON.parse(localStorage.getItem('jwt')) || undefined,
  user: JSON.parse(localStorage.getItem('user')) || undefined,
};

export default initialState;
