/*controllerBase*/

var m_path = require('path');
var m_fs = require('fs');
var m_util = require('util');

var m_config = require('../config');
var m_invalidHandler = require('./invalidHandler');

var FILE_ENCODING = 'utf-8';

// session cache
var m_cache = {};

//  constructor
function controllerBase(req, res) {
  this.req = req;
  this.res = res;
}

// add cache
controllerBase.prototype.addCache = function(key, value) {
  m_cache[key] = value;
};

// get cache
controllerBase.prototype.getCache = function(key) {
  return m_cache[key];
};

// return html
controllerBase.prototype.view = function(viewName) {
  getViewContent.call(this, viewName, renderView);
};

// just a simple template
controllerBase.prototype.template = function(viewName, obj) {
    getViewContent.call(this, viewName, function(content) {
      for(var k in obj) {
        content = content.replace(m_util.format('{#%s}', k), obj[k]);
      }
      renderView.call(this, content);
    });
};

function getViewContent(viewName, callback) {
  var filePath = m_path.join(m_config.ROOT, m_config.VIEWS_DIR, viewName);
  var _this = this;
  m_fs.readFile(filePath, FILE_ENCODING, function(err, content) {
    if(err) {
      m_invalidHandler.handle500(_this.req, _this.res);
      return;
    }
    callback.call(_this, content);
  });
};

function renderView(content) {
  this.res.writeHead(200, { 'Content-Type': m_config.CONTENT_TYPE.html });
  this.res.end(content);
};

// return json
controllerBase.prototype.json = function(obj) {
    this.res.writeHead(200, { 'Content-Type': m_config.CONTENT_TYPE.text });
    this.res.end(JSON.stringify(obj));
};

module.exports = controllerBase;