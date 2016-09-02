var db = require('./db');

module.exports = function(cb) {

  db.sequelize.sync({force: true}).then(function () {
    // Table created
    // return User.create({
    //   firstName: 'John',
    //   lastName: 'Hancock'
    // });
    cb();
  });

};
