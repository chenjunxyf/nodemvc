/*config*/

var m_route = require('./core/route');

exports.CONTENT_TYPE = {
    css: 'text/css',
    gif: 'image/gif',
    html: 'text/html; charset=UTF-8',
    jpe: 'image/jpeg',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'application/x-javascript',
    png: 'image/png',
    text: 'text/plain; charset=UTF-8'
};

exports.ROOT = __dirname;

exports.STATIC_FILE_DIR = 'assets';

exports.VIEWS_DIR = 'views';

exports.FAVICON = '/favicon.png';

m_route.addMap({
  rule: /^\/$/,
  controller: 'base'
});

m_route.addMap({
  method: 'post',
  rule: /^\/login/,
  controller: 'base',
  action: 'login'
});

m_route.addMap({
  rule: /^\/main\/load$/,
  controller: 'main',
  action: 'load'
});