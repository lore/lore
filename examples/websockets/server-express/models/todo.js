var Sequelize = require('sequelize');

module.exports = function(sequelize) {
 return sequelize.define('todo', {
   title: {
     type: Sequelize.STRING
   },
   isCompleted: {
     type: Sequelize.BOOLEAN
   },
   description: {
     type: Sequelize.TEXT
   },
   priority: {
     type: Sequelize.INTEGER
   }
 });
};
