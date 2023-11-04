module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [0, {}],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/prop-types': 0,
    indent: ['error', 2],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'react/no-unstable-nested-components': 'off',
  },
};
