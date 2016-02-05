module.exports = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
};
