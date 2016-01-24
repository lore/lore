const $ = require('jquery-deferred');

/* eslint new-cap: 0 */
class Todos {
  fetch() {
    const deferred = $.Deferred();
    return deferred.promise();
  }

  map() {
    return [];
  }
}

module.exports = Todos;
