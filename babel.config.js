'use strict';

function getTsConfigPaths() {
  const config = require('./tsconfig.json');
  const options = config.compilerOptions || { paths: {} };

  const paths = options.paths;
  const moduleResolverOptions = {};

  Object.keys(paths).forEach((key) => {
    paths[key].forEach((_key, i) => {
      const babelKey = key.replace(/^/, '^').replace(/\*/, '(.*)');
      const babelValue = paths[key][i]
        .replace(/(\.\/)/, options.baseUrl)
        .replace(/(\/\*)/, '/\\1');
      moduleResolverOptions[babelKey] = babelValue;
    });
  });

  const absolutePathsRegex = {
    '^[^@/.]((?!/).*)': options.baseUrl + '\\0'
  };

  return Object.assign(
    moduleResolverOptions,
    options.baseUrl && absolutePathsRegex
  );
}

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: '16' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    [
      'module-resolver',
      {
        alias: getTsConfigPaths(),
        extensions: ['.js', '.json']
      }
    ]
  ],
  ignore: ['./tests']
};
