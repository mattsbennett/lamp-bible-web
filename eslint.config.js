// eslint-config-next 16 ships a flat config array directly, so FlatCompat is
// no longer needed.
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  ...nextCoreWebVitals,
];

module.exports = eslintConfig;
