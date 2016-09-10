module.exports = {

  attributes: {
    title: {
      type: 'string',
      displayName: 'Title',
      placeholder: 'What needs to be done?'
      // description: 'NOT IMPLEMENTED'
    },
    description: {
      type: 'text',
      displayName: 'Description',
      placeholder: 'Write down details about the task...'
      // description: 'NOT IMPLEMENTED'
    },
    isCompleted: {
      type: 'boolean',
      defaultValue: false,
      displayName: 'Is the task complete?'
      // description: 'NOT IMPLEMENTED'
    },
    priority: {
      type: 'number',
      defaultValue: 0,
      displayName: 'Priority'
      // description: 'NOT IMPLEMENTED'
    }
  }

};
