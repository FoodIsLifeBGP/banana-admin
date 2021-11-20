const dotenv = require('dotenv');

const config = ({ config }) => {
  dotenv.config();
  return {
    ...config,
    extra: {
      variant: process.env.APP_VARIANT ? process.env.APP_VARIANT : 'development',
    },
  };
};

export default config;
