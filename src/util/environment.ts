const ADMIN = {
  LOGIN_URL: '/admin_auth',
  CREATE_URL: 'admin/create',
};

const getEnv = () => {
  return ({
    USER_IDENTITY: ADMIN,
    LOGIN_URL: ADMIN,
    API_BASE_URL: getServerEndpoint(),
  })
}

function getServerEndpoint() {
  return 'https://api.bananaapp.org';
}

export default getEnv;
