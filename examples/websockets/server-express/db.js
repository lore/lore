var Sequelize = require('sequelize');
var sqlite3 = require('sqlite3').verbose();

// Create the database
new sqlite3.Database('./bin/db.sqlite');

var sequelize = new Sequelize('database', 'username', 'password', {
  // host: 'localhost',
  dialect: 'sqlite',

  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000
  // },

  // SQLite only
  storage: './bin/db.sqlite'
});

module.exports = {
  models: {
    todo: require('./models/todo')(sequelize)
  },
  sequelize: sequelize
};
