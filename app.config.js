const dotenv = require('dotenv');

export default ({ config }) => {
  dotenv.config();
  return {
    ...config,
    extra: {
      variant: process.env.APP_VARIANT ? process.env.APP_VARIANT : 'development',
    },
  };
};
