import _ from 'lodash';
import find from './find';

/**
 * FindAll Connection Blueprint
 */

export default _.defaultsDeep({

  defaults: {
    include: {
      where: function(model, params) {
        if (_.keys(params.where).length > 0) {
          return _.isMatch(model.data, params.where);
        }

        return true;
      }
    }
  }

}, find);
