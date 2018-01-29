const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack/common/config.common');
const minimalConfig = require('./webpack/common/config.minimal');

const developmentConfig = require('./webpack/config.development');
const eclipseConfig = require('./webpack/config.eclipse');
const productionConfig = require('./webpack/config.production');

const PATHS = {
  contextPath: "/BeInformed/",
  root: __dirname,
  webpack: path.join(__dirname, 'webpack'),
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'WEB-INF')
};

module.exports = (env) => {
  const babelenv = env.production ? 'production' : 'development';

  process.env.BABEL_ENV = babelenv;

  if (env.eclipse) {
    return merge(minimalConfig(PATHS), eclipseConfig(PATHS));
  }

  if (env.jenkins) {
    return merge(minimalConfig(PATHS), productionConfig(PATHS));
  }

  if (babelenv === 'production') {
    return merge(commonConfig(PATHS), productionConfig(PATHS))
  }

  return merge(commonConfig(PATHS), developmentConfig(PATHS));
};
