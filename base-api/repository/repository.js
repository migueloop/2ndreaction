/**
 * Created by coud on 9/16/16.
 */var Sequelize = require('sequelize');
var UserModel = require('./model/user');

module.exports = function() {
  var self = {
    models: {},
  };

  self.sequelize = new Sequelize('agenda', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
  self.models.User = self.sequelize.define('user', UserModel);

  return self;
}
