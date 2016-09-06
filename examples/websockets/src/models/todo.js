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
