const fields = {
  data: {
    title: '',
    description: '',
    isCompleted: false
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
      type: 'string',
      props: {
        label: 'Title',
        placeholder: "What needs to be done?"
      }
    },
    description: {
      type: 'text',
      props: {
        label: 'Description',
        placeholder: "Write down details about the task..."
      }
    },
    isCompleted: {
      type: 'checkbox',
      props: {
        label: 'Is the task complete?',
        description: 'Check the box if it is.'
      }
    },
    // priority: {
    //   type: 'number',
    //   props: {
    //     label: 'Priority',
    //     description: 'Relative importance of the task (0 is lowest priority)'
    //   }
    // }
  }
};

export default {

  dialogs: {
    create: fields,
    update: fields
  },

  websockets: {
    serverUrl : '',
    namespace: '',
    connect: function(){},
    onConnect: function(){},
    actions: {
      create: function() {}
    },
    dispatchers: {
      created: function(store){
        return function(message) {}
      }
    }
  }

};
