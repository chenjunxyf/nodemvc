/*staticFileHandler*/

var m_parseURL = require('url').parse;
var m_path = require('path');
var m_fs = require('fs');

var m_config = require('../config');
var m_invalidHandler = require('./invalidHandler');

var FILE_ENCODING = 'binary';

exports.handle = function(req, res) {
  var url = m_parseURL(req.url);
  var filePath = url.pathname == m_config.FAVICON ? m_path.join(m_config.ROOT, url.pathname) :
        m_path.join(m_config.ROOT, m_config.STATIC_FILE_DIR, url.pathname);

  m_fs.exists(filePath, function(exists) {
    if(!exists) {
      m_invalidHandler.handle404(req, res);
      return;
    }

    m_fs.readFile(filePath, FILE_ENCODING, function(err, file) {
      if(err) {
        m_invalidHandler.handle500(req, res, err);
      }
      var ext;
      ext = (ext = m_path.extname(filePath)) ? ext.slice(1) : 'html';
      res.writeHead(200, {'Content-Type': m_config.CONTENT_TYPE[ext] || m_config.CONTENT_TYPE.html});
      res.write(file, FILE_ENCODING);
      res.end();
    });
  });
};