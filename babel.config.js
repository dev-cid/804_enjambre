const plugins = [
    '@babel/plugin-proposal-class-properties',
    'transform-decorators-legacy',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true } ],
  ];
  
  module.exports = { plugins };