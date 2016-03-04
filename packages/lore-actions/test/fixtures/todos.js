const Promise = require('bluebird');

/* eslint new-cap: 0 */
class Todos {
  constructor() {
    this.models = [];
  }

  fetch() {
    return Promise.resolve();
  }
}

module.exports = Todos;
