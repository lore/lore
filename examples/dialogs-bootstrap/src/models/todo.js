module.exports = {

  attributes: {
    title: {
      type: 'string',
      displayName: 'Title',
      // description: 'The thing that needs to be done',
      placeholder: 'What needs to be done?'
    },
    description: {
      type: 'text',
      displayName: 'Description',
      // description: 'Details about the task',
      placeholder: 'Write down details about the task...'
    },
    isCompleted: {
      type: 'boolean',
      defaultValue: false,
      displayName: 'Is the task complete?',
      description: 'Check the box if it is.'
    },
    priority: {
      type: 'number',
      defaultValue: 0,
      displayName: 'Priority',
      description: 'Relative importance of the task (0 is lowest priority)'
    }
  }

};
