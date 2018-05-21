const fields = {
  data: {
    title: '',
    isCompleted: false,
  },
  validators: {
    title: [function(value) {
      if (!value) {
        return 'This field is required';
      }
    }]
  },
  fields: {
    title: {
      type: 'text',
      props: {
        label: 'Title',
        placeholder: 'What needs to be done?'
      }
    },
    isCompleted: {
      type: 'checkbox',
      props: {
        label: 'Is the task complete?',
        description: 'Check the box if it is.'
      }
    }
  }
};

export default {

  dialogs: {
    create: fields,
    update: fields
  }

};
