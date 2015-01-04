/*base*/
var test = require('../models/user');

exports.index = function() {
  this.view('index.html');
};

exports.login = function(data) {
  var state = false;
  var users = test.users;
  for(var i = 0; i < users.length; i++) {
    if(users[i].name == data.name && users[i].password == data.pwd) {
      this.addCache('user', data.name);
      state = true;
      break;
    }
  }
  this.json({success: state});
}