const $ = require('jquery-deferred');

/* eslint new-cap: 0 */
class Todo {
  fetch() {
    const deferred = $.Deferred();
    return deferred.promise();
  }

  save() {
    const deferred = $.Deferred();
    return deferred.promise();
  }

  destroy() {
    const deferred = $.Deferred();
    return deferred.promise();
  }

  set() {}

  toJSON() {
    return {
      name: 'testModel'
    };
  }
}

module.exports = Todo;
