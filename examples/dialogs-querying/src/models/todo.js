var _ = require('lodash');

module.exports = {

  properties: {

    parse: function(attributes) {
      if (_.isPlainObject(attributes.list)) {
        attributes.list = attributes.list.id;
      }
      return attributes;
    }

  }

};
