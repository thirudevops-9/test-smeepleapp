module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'yup',
            message: 'Please use the object from @smeeple/shared/util/validation instead.',
          },
          {
            name: '@truefit/http-utils',
            importNames: ['get', 'put', 'post', 'patch', 'del'],
            message: 'Please use the functions from util/http instead.',
          },
        ],
      },
    ],
  },
};
