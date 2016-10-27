var Repository = require('../../repository/repository');
var repo = new Repository();
var User = repo.models.User;

function getAllUsers(req, res) {
  User.findAll({})
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

function getUser(req, res) {
  User.findOne({
    where: {
      id: req.swagger.params.id.value,
    }
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
};
