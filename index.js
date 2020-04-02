var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({followRedirects: true});

function create(target, port) {
  http.createServer(function(req, res) {
    req.headers.host = target;
    proxy.web(req, res, { target: 'http://' + target});
  }).listen(port);
}

create('www.google.com', 5050);
create('forums.huaren.us', 5051);
create('my2020census.gov', 5052);
