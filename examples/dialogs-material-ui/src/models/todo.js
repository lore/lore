module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    description: {
      type: 'text'
    },
    isCompleted: {
      type: 'boolean',
      defaultValue: false
    },
    priority: {
      type: 'number',
      defaultValue: 0
    }
  }

};
