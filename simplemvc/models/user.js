/*user test*/

var userList = function() {
  var data = [
    { name: 'cj', password: '123' },
    { name: 'ab', password: '456' },
    { name: 'cd', password: '789' }
  ];

  return data;
};

exports.users = userList();