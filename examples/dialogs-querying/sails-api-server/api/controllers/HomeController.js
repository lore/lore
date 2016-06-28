/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    res.json({
      endpoints: {
        "lists": "/lists",
        "todos": "/todos"
      }
    })
  }

};

