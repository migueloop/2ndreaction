var usersJson = require('./seed.json');
var Repository = require('../repository/repository');

var repo = new Repository();

var User = repo.models.User;

User.sync({ force: true })
  .then(function (){
    return Promise.all(
      usersJson.map(function(user) {
        User.create({
          gender: user.gender,
          title: user.name.title,
          first: user.name.first,
          last: user.name.last,
          email: user.email,
          username: user.login.username,
          phone: user.phone,
          cell: user.cell,
          picture: user.picture.large,
          registered: new Date(user.registered).getTime(),
          dob: new Date(user.dob).getTime(),
        })
      })
    );
  });