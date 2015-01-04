/*requestHandler*/

var m_util = require('util');
var m_parseURL = require('url').parse;

var m_route = require('./route');
var m_controllerBase = require('./controllerBase');
var m_staticFileHandler = require('./staticFileHandler');
var m_invalidHandler = require('./invalidHandler');

var m_getRequestArgs = {
  get: function(req) {
    return m_parseURL(req.url).query;
  },
  post: function(req) {
    return req.post;
  }
};

exports.handle = function(req, res) {
  var method = req.method ? req.method.toLowerCase() : 'get';
  var route = m_route.find(req.url, method);

  if(route.action) {
    var controller = require(m_util.format('../controllers/%s', route.controller));
    if(controller[route.action]) {
      try {
        controller[route.action].call(
          new m_controllerBase(req, res),
          m_getRequestArgs.hasOwnProperty(method) ? m_getRequestArgs[method](req) : {});
      } catch(e) {
        m_invalidHandler.handle500(req, res);
      }
    } else {
      m_invalidHandler.handle404(req, res);
    }
  } else {
    m_staticFileHandler.handle(req, res);
  }
};
