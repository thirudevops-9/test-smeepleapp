module.exports = {
  '*.{ts,tsx}': ['eslint --color --cache --fix', 'prettier --write'],
  '**/*.ts?(x)': () => 'tsc --noEmit',
};
