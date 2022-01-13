const getEnv = () => {
  return ({
    CREATE_URL: 'admin_auth',
    LOGIN_URL: '/login',
    // TODO: Update logic for user identity to either: 'view-only' | 'admin' | 'super-admin'
    USER_IDENTITY: 'view-only',
    API_BASE_URL: getServerEndPoint(),
  })
}

const getServerEndPoint = () => {
  if (process.env.APP_VARIANT === "development") {
    return 'https://dev.bananaapp.org'
  } else if (process.env.APP_VARIANT === "production") {
    return 'https://api.bananaapp.org';
  } else {
    console.error('Please set your APP_VARIANT in your .env as either "development" or "production".')
		return
  }
}

export default getEnv;
