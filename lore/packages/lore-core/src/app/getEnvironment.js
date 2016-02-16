module.exports = function getEnvironment(configOverride) {
  return configOverride.environment || process.env.NODE_ENV || 'development';
};
