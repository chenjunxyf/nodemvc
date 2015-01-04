/*route*/

var m_cache = {};

exports.addMap = function(map) {
  if(!(map && map.rule && map.controller))
    return;

  var method = (map.method || 'get').toLowerCase();
  m_cache[method] || (m_cache[method] = []);

  m_cache[method].push({
    rule: map.rule,
    controller: map.controller,
    action: map.action || 'index'
  });
};

exports.find = function(url, method) {
  var route = {controller: null, action: null};
  var routes;

  if(!(m_cache.hasOwnProperty(method) && (routes = m_cache[method]).length))
    return route;

  for(var i = 0, r; r = routes[i]; i++) {
    if(r.rule.test(url)) {
      route.controller = r.controller;
      route.action = r.action;
      break;
    }
  }

  return route;
}