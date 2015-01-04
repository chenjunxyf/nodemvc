/*user*/

exports.load = function() {
  var msg = this.getCache('user') || 'not login';
  this.template('main.html', {msg: msg});
};