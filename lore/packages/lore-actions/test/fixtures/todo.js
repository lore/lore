const Promise = require('bluebird');

/* eslint new-cap: 0 */
class Todo {
  fetch() {
    return Promise.resolve();
  }

  save() {
    return Promise.resolve();
  }

  destroy() {
    return Promise.resolve();
  }

  set() {}

  toJSON() {
    return {
      name: 'testModel'
    };
  }
}

module.exports = Todo;
