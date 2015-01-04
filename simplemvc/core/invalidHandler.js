/*invalidHandler*/

exports.handle404 = function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('page not found');
};

exports.handle500 = function(req, res) {
  res.writeHead(500, {});
  res.end();
};