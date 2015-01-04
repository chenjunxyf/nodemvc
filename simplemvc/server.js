/*server*/

var m_http = require('http');
var m_querystring = require('querystring');
var m_requestHandler = require('./core/requestHandler');

exports.run = function(port) {
  port || (port = 80);

  m_http.createServer(function(req, res) {
    req.setEncoding('utf8');
    var postData = [];
    req.on('data', function(chunk) {
      postData.push(chunk);
    }).on('end', function() {
      req.post = m_querystring.parse(postData.join(''));
      m_requestHandler.handle(req, res);
    });
  }).listen(port);

  console.log('server is running！');
};