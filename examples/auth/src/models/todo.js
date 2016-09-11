module.exports = {

  attributes: {
    title: {
      type: 'string',
      displayName: 'Title',
      placeholder: 'What needs to be done?'
    },
    isCompleted: {
      type: 'boolean',
      defaultValue: false,
      displayName: 'Is the task complete?',
      description: 'Check the box if it is.'
    }
  }

};
